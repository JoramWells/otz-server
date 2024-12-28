CREATE OR REPLACE PROCEDURE index_add_attach_appointments_partition(partion_day date)
LANGUAGE plpgsql AS
$$
BEGIN
EXECUTE format(
	$i$
		ALTER TABLE "appointments_%1$s" PRIMARY KEY(patientID, createdAt);
		ALTER TABLE "appointments_%1$s" add constraint "appointment_by_range_checks_%1$s"
		CHECK (createdAt >= DATE %1$L AND createdAt < DATE %2$L);

		CREATE INDEX "appointments_%1$s_created_at"
		ON "appointments_%1$s"
		USING btree(created_at)
		WITH (fillfactor=100);

		ALTER INDEX "appointments_created_at" ATTACH
		PARTITION "appointments_%1$s"
		FOR VALUES FROM (%1$L) TO (%2$L);

		ALTER  INDEX "appointments_created_at"
		ATTACH PARTITION "appointments_%1$s_created_at";

		alter TABLE "appointments_%1$s" DROP CONSTRAINT
		"appointment_by_range_checks_%1$s";

		$i$,
		partition_day,(partition_day + interval '1 day')::date);
		END;
		$$;

        --
--
-- Wrapper function to create, copy, index and attach a given day.
--

-- Partition by day
CREATE OR REPLACE PROCEDURE public.create_appointment_partition(partition_day date)
	LANGUAGE plpgsql AS
$$
BEGIN
	EXECUTE format(
		$i$
		CREATE TABLE IF NOT EXISTS public."appointments2_%1$s"
		(LIKE public.appointments INCLUDING DEFAULTS INCLUDING CONSTRAINTS);
		$i$, partition_day);
END;
$$;			

CREATE OR REPLACE PROCEDURE public.copy_appointments_partition(partition_day date)
LANGUAGE plpgsql as
$$
DECLARE
	num_copied bigint = 0;

BEGIN
	EXECUTE format(
	$i$
		INSERT INTO "appointments2_%1$s" (id, "createdAt")
		SELECT id, "createdAt" FROM appointments
		WHERE "createdAt"::date >= %1$L::date AND "createdAt"::date < (%1$L::date + interval '1 day')
		ORDER BY "createdAt"
		$i$, partition_day
	);
	GET DIAGNOSTICS num_copied = ROW_COUNT;
	RAISE NOTICE 'Copied % rows to %', num_copied, format('public."appointments2_%1$s"', partition_day);
	END;
$$;



CREATE OR REPLACE PROCEDURE load_appointment_partition(i date)
    LANGUAGE plpgsql AS
$$
BEGIN
    CALL public.create_appointment_partition(i);
    CALL public.copy_appointments_partition(i);
    CALL public.index_add_attach_appointments_partition(i);
END;
$$;
--
-- This procedure loops over all days in the old table, copying each day
-- and then committing the transaction.
--
CREATE OR REPLACE PROCEDURE load_appointment_partitions()
    LANGUAGE plpgsql AS
$$
DECLARE
    start_date date;
    end_date date;
    i date;
BEGIN
    SELECT min("createdAt")::date INTO start_date FROM appointments;
    SELECT max("createdAt")::date INTO end_date FROM appointments;
    FOR i IN SELECT * FROM generate_series(end_date, start_date, interval '-1 day') LOOP
        CALL load_appointment_partition(i);
        COMMIT;
    END LOOP;
END;
$$;


--
-- This procedure will be used by pg_cron to create both new
-- partitions for "today".
--
-- CREATE OR REPLACE PROCEDURE public.create_daily_partition(today date)
--     LANGUAGE plpgsql AS
-- $$
-- BEGIN
--     CALL public.create_appointment_partition(today);
--     -- CALL app.create_chat_messages_partition(today);
-- END;
-- $$;

-- SELECT cron.schedule('new-appointment-partition', '0 23 * * *', 'CALL public.create_daily_partition(now()::date + "interval 1 day")');
-- COMMIT;

CALL load_appointment_partitions();
-- CALL public.create_appointment_partition('2024-12-24'::date);
