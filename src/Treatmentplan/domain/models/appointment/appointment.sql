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
CREATE OR REPLACE PROCEDURE public.load_appointment_partition(i date)
    LANGUAGE plpgsql AS
$$
BEGIN
    CALL public.create_appointments_partition(i);
    -- CALL public.copy_chats_partition(i);
    CALL public.index_add_attach_appointments_partition(i);
END;
$$;
--
-- This procedure loops over all days in the old table, copying each day
-- and then committing the transaction.
--
CREATE OR REPLACE PROCEDURE public.load_appointment_partitions()
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
        CALL public.load_appointment_partition(i);
        COMMIT;
    END LOOP;
END;
$$;


--
-- This procedure will be used by pg_cron to create both new
-- partitions for "today".
--
CREATE OR REPLACE PROCEDURE public.create_daily_partition(today date)
    LANGUAGE plpgsql AS
$$
BEGIN
    CALL public.create_appointment_partition(today);
    -- CALL app.create_chat_messages_partition(today);
END;
$$;

SELECT cron.schedule('new-appointment-partition', '0 23 * * *', 'CALL public.create_daily_partition(now()::date + "interval 1 day")');
COMMIT;
