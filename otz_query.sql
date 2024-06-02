--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: AgeLine; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."AgeLine" AS ENUM (
    'pediatrics',
    'adults'
);


ALTER TYPE public."AgeLine" OWNER TO postgres;

--
-- Name: ArtPhase; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ArtPhase" AS ENUM (
    'first line',
    'second line',
    'third line'
);


ALTER TYPE public."ArtPhase" OWNER TO postgres;

--
-- Name: enum_artCategories_ageLine; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_artCategories_ageLine" AS ENUM (
    'pediatrics',
    'adults'
);


ALTER TYPE public."enum_artCategories_ageLine" OWNER TO postgres;

--
-- Name: enum_artCategories_artPhase; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_artCategories_artPhase" AS ENUM (
    'first line',
    'second line',
    'third line'
);


ALTER TYPE public."enum_artCategories_artPhase" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SMSWhatsapp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SMSWhatsapp" (
    id uuid NOT NULL,
    "appointmentID" uuid,
    "notificationType" character varying(255),
    "phoneNo" character varying(255),
    "messageText" character varying(255),
    "scheduledDate" date,
    "scheduledTime" time without time zone DEFAULT CURRENT_TIME,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."SMSWhatsapp" OWNER TO postgres;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: allergies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.allergies (
    id uuid NOT NULL,
    "causativeAgent" character varying(255),
    reaction character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.allergies OWNER TO postgres;

--
-- Name: appointmentAgendas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."appointmentAgendas" (
    id uuid NOT NULL,
    "agendaDescription" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."appointmentAgendas" OWNER TO postgres;

--
-- Name: appointmentStatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."appointmentStatus" (
    id uuid NOT NULL,
    "statusDescription" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."appointmentStatus" OWNER TO postgres;

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointments (
    id uuid NOT NULL,
    "userID" uuid,
    "patientID" uuid,
    "appointmentAgendaID" uuid,
    "appointmentStatusID" uuid,
    "appointmentDate" date,
    "appointmentTime" time without time zone,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "patientVisitID" uuid DEFAULT public.uuid_generate_v4()
);


ALTER TABLE public.appointments OWNER TO postgres;

--
-- Name: artCategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."artCategories" (
    id uuid NOT NULL,
    "artCategoryDescription" character varying(255),
    "ageLine" character varying(255),
    "artPhaseID" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "artPhase" public."ArtPhase"
);


ALTER TABLE public."artCategories" OWNER TO postgres;

--
-- Name: artPrescriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."artPrescriptions" (
    id uuid NOT NULL,
    "patientID" uuid,
    regimen character varying(255),
    "startDate" timestamp with time zone,
    "isStandard" boolean,
    line character varying(255),
    "changeReason" character varying(255),
    "stopReason" character varying(255),
    "changeDate" timestamp with time zone,
    "stopDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "patientVisitID" uuid
);


ALTER TABLE public."artPrescriptions" OWNER TO postgres;

--
-- Name: artRegimenPhases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."artRegimenPhases" (
    id uuid NOT NULL,
    "artPhaseDescription" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."artRegimenPhases" OWNER TO postgres;

--
-- Name: artRegimenSwitch; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."artRegimenSwitch" (
    id uuid NOT NULL,
    "patientID" uuid,
    "artID" uuid,
    "regimenLineID" uuid,
    "switchDate" timestamp with time zone,
    "switchReasonID" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."artRegimenSwitch" OWNER TO postgres;

--
-- Name: artSwitchReasons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."artSwitchReasons" (
    id uuid NOT NULL,
    reason character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."artSwitchReasons" OWNER TO postgres;

--
-- Name: articleCategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."articleCategories" (
    id uuid NOT NULL,
    description character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."articleCategories" OWNER TO postgres;

--
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    id uuid NOT NULL,
    "userID" uuid,
    "chapterID" uuid,
    image character varying(255),
    content text,
    title character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- Name: arts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.arts (
    id uuid NOT NULL,
    "artName" character varying(255),
    "artCategoryID" uuid,
    "measuringUnitID" uuid,
    quantity integer,
    "expiryDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.arts OWNER TO postgres;

--
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    id uuid NOT NULL,
    description character varying(255),
    thumbnail character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.books OWNER TO postgres;

--
-- Name: caregivers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.caregivers (
    id uuid NOT NULL,
    "patientID" uuid,
    "firstName" character varying(255),
    "middleName" character varying(255),
    "lastName" character varying(255),
    sex character varying(255),
    dob timestamp with time zone,
    "idNo" character varying(255),
    "phoneNo" character varying(255),
    relationship character varying(255),
    "countyID" character varying(255),
    drugs character varying(255),
    "careerID" character varying(255),
    "maritalStatus" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.caregivers OWNER TO postgres;

--
-- Name: caseManagers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."caseManagers" (
    id uuid NOT NULL,
    "patientID" uuid,
    "userID" uuid,
    "isNotification" boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."caseManagers" OWNER TO postgres;

--
-- Name: chapters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chapters (
    id uuid NOT NULL,
    description character varying(255),
    thumbnail character varying(255),
    "bookID" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.chapters OWNER TO postgres;

--
-- Name: chatMessages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."chatMessages" (
    id uuid NOT NULL,
    "chatID" uuid,
    text character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."chatMessages" OWNER TO postgres;

--
-- Name: chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chats (
    id uuid NOT NULL,
    members character varying(255)[],
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.chats OWNER TO postgres;

--
-- Name: childCaregiverReadiness; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."childCaregiverReadiness" (
    id uuid NOT NULL,
    "patientID" uuid,
    "patientVisitID" uuid,
    "isChildKnowsMedicineAndIllness" boolean,
    "isAssessedCaregiverReadinessToDisclose" boolean,
    "isCaregiverCommunicatedToChild" boolean,
    "isChildSchoolEngagement" boolean,
    "isConsistentSocialSupport" boolean,
    "isFreeChildCaregiverFromSevereIllness" boolean,
    "isSecuredPatientInfo" boolean,
    "isInterestInEnvironmentAndPlaying" boolean,
    "taskTwoComments" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."childCaregiverReadiness" OWNER TO postgres;

--
-- Name: childDisclosureEligibility; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."childDisclosureEligibility" (
    id uuid NOT NULL,
    "patientID" uuid,
    "patientVisitID" uuid,
    "isCorrectAge" boolean,
    "isWillingToDisclose" boolean,
    "isKnowledgeable" boolean,
    "taskOneComments" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."childDisclosureEligibility" OWNER TO postgres;

--
-- Name: chronicIllness; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."chronicIllness" (
    id uuid NOT NULL,
    "patientID" uuid,
    illness character varying(255),
    "onSetDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."chronicIllness" OWNER TO postgres;

--
-- Name: counties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.counties (
    id integer NOT NULL,
    "countyName" character varying,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.counties OWNER TO postgres;

--
-- Name: counties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.counties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.counties_id_seq OWNER TO postgres;

--
-- Name: counties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.counties_id_seq OWNED BY public.counties.id;


--
-- Name: disclosureChecklist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."disclosureChecklist" (
    id uuid NOT NULL,
    "patientID" uuid,
    "patientVisitID" uuid,
    "disclosureDate" timestamp with time zone,
    "isCorrectAge" boolean,
    "isWillingToDisclose" boolean,
    "isKnowledgeable" boolean,
    "taskOneComments" character varying(255),
    "isFreeFromSevereIllness" boolean,
    "isFamilySupport" boolean,
    "isEnvironmentInterest" boolean,
    "isAware" boolean,
    "isSchoolFree" boolean,
    "isDisclosureReady" boolean,
    "isChildCommunicated" boolean,
    "isSecuredPatientInfo" boolean,
    "taskTwoComments" character varying(255),
    "isReassuredCaregiver" boolean,
    "isAssessedChildCaregiverComfort" boolean,
    "isSupportedCaregiverChildToDisclose" boolean,
    "isObservedReactions" boolean,
    "isInvitedChildQuestions" boolean,
    "isReviewedBenefitsOfDisclosure" boolean,
    "isExplainedCareOptions" boolean,
    "isConcludedSessionReassured" boolean,
    "taskThreeComments" character varying(255),
    "isPeerRelationshipAssessed" boolean,
    "isChildActivityAssessed" boolean,
    "isChildQuestionsAllowed" boolean,
    "isAddressedNegativeImage" boolean,
    "isAssessedMoodiness" boolean,
    "isReferredForPhysic" boolean,
    "isGivenInfo" boolean,
    "taskFourComments" character varying(255),
    "finalComments" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."disclosureChecklist" OWNER TO postgres;

--
-- Name: disclosureChecklists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."disclosureChecklists" (
    id uuid NOT NULL,
    "patientID" uuid,
    "disclosureDate" character varying(255),
    "isCorrectAge" character varying(255),
    "isWillingToDisclose" character varying(255),
    "isKnowledgeable" character varying(255),
    "taskOneComments" character varying(255),
    "isFreeFromSevereIllness" character varying(255),
    "isFamilySupport" character varying(255),
    "isEnvironmentInterest" character varying(255),
    "isAware" character varying(255),
    "isSchoolFree" character varying(255),
    "isDisclosureReady" character varying(255),
    "isChildCommunicated" character varying(255),
    "isSecuredPatientInfo" character varying(255),
    "taskTwoComments" character varying(255),
    "isReassuredCaregiver" character varying(255),
    "isAssessedChildCaregiverComfort" character varying(255),
    "isSupportedCaregiverChildToDisclose" character varying(255),
    "isObservedReactions" character varying(255),
    "isInvitedChildQuestions" character varying(255),
    "isReviewedBenefitsOfDisclosure" character varying(255),
    "isExplainedCareOptions" character varying(255),
    "isConcludedSessionReassured" character varying(255),
    "taskThreeComments" character varying(255),
    "isPeerRelationshipAssessed" character varying(255),
    "isChildActivityAssessed" character varying(255),
    "isChildQuestionsAllowed" character varying(255),
    "isAddressedNegativeImage" character varying(255),
    "isAssessedMoodiness" character varying(255),
    "isReferredForPhysic" character varying(255),
    "isGivenInfo" character varying(255),
    "taskFourComments" character varying(255),
    "finalComments" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."disclosureChecklists" OWNER TO postgres;

--
-- Name: followUpChecklist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."followUpChecklist" (
    id uuid NOT NULL,
    "patientID" uuid,
    "patientVisitID" uuid,
    "followUpDate" character varying(255),
    bmi character varying(255),
    "tannerStaging" character varying(255),
    disclosure character varying(255),
    "adherenceCounselling" character varying(255),
    "isPAMA" boolean,
    "isOVC" character varying(255),
    "isActiveSupportGroup" character varying(255),
    "isVLValid" character varying(255),
    "isOptimizationDone" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."followUpChecklist" OWNER TO postgres;

--
-- Name: homeVisitFrequencies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."homeVisitFrequencies" (
    id uuid NOT NULL,
    "homeVisitFrequencyDescription" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."homeVisitFrequencies" OWNER TO postgres;

--
-- Name: homeVisitReasons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."homeVisitReasons" (
    id uuid NOT NULL,
    "homeVisitReasonDescription" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."homeVisitReasons" OWNER TO postgres;

--
-- Name: homeVisits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."homeVisits" (
    id uuid NOT NULL,
    "patientID" uuid,
    "homeVisitReasonID" uuid,
    "userID" uuid,
    "dateRequested" timestamp with time zone,
    "homeVisitFrequencyID" uuid,
    "artPrescription" jsonb,
    "tbPrescription" jsonb,
    "noOfPills" integer,
    "medicineStatus" character varying(255),
    "actionTaken" character varying(255),
    "returnToClinic" timestamp with time zone,
    "isPillsCounted" boolean,
    "isClinicVisits" boolean,
    "isDisclosure" boolean,
    "isGuardianSupport" boolean,
    "isSupportGroupAttendance" boolean,
    "isHouseholdTested" boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "artPrescriptionID" uuid
);


ALTER TABLE public."homeVisits" OWNER TO postgres;

--
-- Name: hospitals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hospitals (
    id integer NOT NULL,
    "subCountyID" character varying(255),
    "mflCode" integer,
    "hospitalName" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.hospitals OWNER TO postgres;

--
-- Name: hospitals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hospitals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hospitals_id_seq OWNER TO postgres;

--
-- Name: hospitals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hospitals_id_seq OWNED BY public.hospitals.id;


--
-- Name: internalLabRequests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."internalLabRequests" (
    id uuid NOT NULL,
    "patientID" uuid,
    "specimenType" character varying(255),
    "testName" character varying(255),
    urgency character varying(255),
    "normalValues" character varying(255),
    "dateRequested" timestamp with time zone,
    reason character varying(255),
    results character varying(255),
    "resultDate" timestamp with time zone DEFAULT '2024-04-12 10:32:01.839+00'::timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."internalLabRequests" OWNER TO postgres;

--
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    id uuid NOT NULL,
    "userID" uuid,
    "locationID" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- Name: measuringUnits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."measuringUnits" (
    id uuid NOT NULL,
    description character varying(255),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."measuringUnits" OWNER TO postgres;

--
-- Name: messageTextReplies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."messageTextReplies" (
    id uuid NOT NULL,
    "messageText" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."messageTextReplies" OWNER TO postgres;

--
-- Name: mmas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mmas (
    id uuid NOT NULL,
    "patientID" uuid,
    "patientVisitID" uuid,
    "isForget" boolean,
    "isCareless" boolean,
    "isQuitFeelWorse" boolean,
    "isQuitFeelBetter" boolean,
    "isTookMedYesterday" boolean,
    "isQuitOutControl" boolean,
    "isUnderPressure" boolean,
    "difficultyRemembering" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.mmas OWNER TO postgres;

--
-- Name: mmasEight; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."mmasEight" (
    id uuid NOT NULL,
    "patientID" uuid,
    "patientVisitID" uuid,
    "mmasFourID" uuid,
    "isTookMedYesterday" boolean,
    "isQuitOutControl" boolean,
    "isUnderPressure" boolean,
    "difficultyRemembering" character varying(255),
    "totalScores" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."mmasEight" OWNER TO postgres;

--
-- Name: mmasFour; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."mmasFour" (
    id uuid NOT NULL,
    "patientID" uuid,
    "patientVisitID" uuid,
    "isForget" boolean,
    "isCareless" boolean,
    "isQuitFeelWorse" boolean,
    "isQuitFeelBetter" boolean,
    "totalScores" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."mmasFour" OWNER TO postgres;

--
-- Name: nextOfKin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."nextOfKin" (
    id uuid NOT NULL,
    "patientID" uuid,
    "firstName" character varying(255),
    "middleName" character varying(255),
    "lastName" character varying(255),
    sex character varying(255),
    dob timestamp with time zone,
    "idNo" character varying(255),
    "phoneNo" character varying(255),
    relationship character varying(255),
    "certificateNo" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."nextOfKin" OWNER TO postgres;

--
-- Name: notificationCategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."notificationCategories" (
    id uuid NOT NULL,
    "notificationDescription" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."notificationCategories" OWNER TO postgres;

--
-- Name: notificationSubCategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."notificationSubCategories" (
    id uuid NOT NULL,
    "notificationCategoryID" uuid,
    "notificationSubCategoryName" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."notificationSubCategories" OWNER TO postgres;

--
-- Name: notificationTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."notificationTypes" (
    id uuid NOT NULL,
    "notificationTypeName" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."notificationTypes" OWNER TO postgres;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id uuid NOT NULL,
    "notificationSubCategoryID" uuid,
    "notificationDescription" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: occupations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.occupations (
    id uuid NOT NULL,
    "occupationDescription" character varying,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.occupations OWNER TO postgres;

--
-- Name: otzEnrollments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."otzEnrollments" (
    id integer NOT NULL,
    "patientID" uuid,
    "dateOfEnrollmentToOTZ" timestamp with time zone,
    "vlResults" character varying(255),
    "dateOfVL" timestamp with time zone,
    "isValid" character varying(255),
    "currentARTRegimen" character varying(255),
    "currentARTStartDate" timestamp with time zone,
    "currentRegimenLine" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."otzEnrollments" OWNER TO postgres;

--
-- Name: otzEnrollments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."otzEnrollments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."otzEnrollments_id_seq" OWNER TO postgres;

--
-- Name: otzEnrollments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."otzEnrollments_id_seq" OWNED BY public."otzEnrollments".id;


--
-- Name: pamaProfile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."pamaProfile" (
    id uuid NOT NULL,
    "childID" uuid,
    "primaryCaregiverID" uuid,
    "childVLStatus" jsonb,
    "isPaired" boolean,
    "noOfCaregivers" character varying(255),
    "childPrescriptionStatus" jsonb,
    "primaryCaregiverVLStatus" jsonb,
    "primaryCaregiverPrescriptionStatus" jsonb,
    "dateOfEnrollment" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."pamaProfile" OWNER TO postgres;

--
-- Name: partialDisclosure; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."partialDisclosure" (
    id uuid NOT NULL,
    "childDisclosureEligibilityID" uuid,
    "childCaregiverReadinessID" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."partialDisclosure" OWNER TO postgres;

--
-- Name: patientAllergies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."patientAllergies" (
    id uuid NOT NULL,
    "allergyName" character varying(255),
    "allergyReaction" character varying(255),
    severity character varying(255),
    "patientID" character varying(255),
    "onSetDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."patientAllergies" OWNER TO postgres;

--
-- Name: patientNotifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."patientNotifications" (
    id uuid NOT NULL,
    "patientID" uuid,
    "userID" uuid,
    "medicineTime" time without time zone,
    message character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."patientNotifications" OWNER TO postgres;

--
-- Name: patientVisits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."patientVisits" (
    id uuid NOT NULL,
    "patientID" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."patientVisits" OWNER TO postgres;

--
-- Name: patients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patients (
    id uuid NOT NULL,
    "firstName" character varying,
    "middleName" character varying,
    "lastName" character varying,
    sex character varying,
    dob character varying,
    "schoolID" integer,
    "hospitalID" integer,
    "phoneNo" character varying,
    "occupationID" uuid,
    "idNo" character varying,
    "cccNo" character varying,
    nupi character varying,
    residence character varying,
    "ageAtReporting" integer,
    "dateConfirmedPositive" date,
    "initialRegimen" character varying,
    "populationType" character varying,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "entryPoint" character varying(255),
    "subCountyName" character varying(255),
    location json,
    "maritalStatus" character varying
);


ALTER TABLE public.patients OWNER TO postgres;

--
-- Name: pills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pills (
    id uuid NOT NULL,
    "patientID" uuid,
    "artID" uuid,
    "noOfPills" character varying(255),
    frequency integer,
    "refillDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.pills OWNER TO postgres;

--
-- Name: pmtctProfile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."pmtctProfile" (
    id uuid NOT NULL,
    "patientID" uuid,
    "kmhflCode" integer,
    anc character varying(255),
    "pncNo" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."pmtctProfile" OWNER TO postgres;

--
-- Name: prescriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prescriptions (
    id uuid NOT NULL,
    "drugID" uuid,
    "patientID" uuid,
    "noOfPills" integer,
    "measuringUnitID" uuid,
    "refillDate" timestamp without time zone,
    description character varying,
    frequency integer,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "nextRefillDate" date,
    "patientVisitID" uuid
);


ALTER TABLE public.prescriptions OWNER TO postgres;

--
-- Name: schoolTermHolidays; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."schoolTermHolidays" (
    id uuid NOT NULL,
    "schoolTermID" uuid,
    "termHolidayDescription" character varying(255),
    "openingDate" timestamp with time zone,
    "closingDate" timestamp with time zone,
    duration character varying(255)
);


ALTER TABLE public."schoolTermHolidays" OWNER TO postgres;

--
-- Name: schoolTerms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."schoolTerms" (
    id uuid NOT NULL,
    "termDescription" character varying(255),
    "openingDate" timestamp with time zone,
    "closingDate" timestamp with time zone,
    duration character varying(255)
);


ALTER TABLE public."schoolTerms" OWNER TO postgres;

--
-- Name: schools; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schools (
    id integer NOT NULL,
    "schoolName" character varying,
    region character varying,
    "countyName" character varying,
    "subCountyName" character varying,
    ward character varying,
    division character varying,
    location character varying,
    "subLocation" character varying,
    level character varying,
    status character varying,
    sponsor character varying,
    longitude character varying,
    latitude character varying,
    "noClassrooms" character varying,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.schools OWNER TO postgres;

--
-- Name: schools_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.schools_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.schools_id_seq OWNER TO postgres;

--
-- Name: schools_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.schools_id_seq OWNED BY public.schools.id;


--
-- Name: subCounties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."subCounties" (
    id integer NOT NULL,
    "countyID" integer,
    "subCountyName" character varying,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


ALTER TABLE public."subCounties" OWNER TO postgres;

--
-- Name: subCounties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."subCounties_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."subCounties_id_seq" OWNER TO postgres;

--
-- Name: subCounties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."subCounties_id_seq" OWNED BY public."subCounties".id;


--
-- Name: timeAndWork; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."timeAndWork" (
    id uuid NOT NULL,
    "patientID" uuid,
    "wakeUpTime" time without time zone,
    "departureHomeTime" time without time zone,
    "arrivalWorkTime" time without time zone,
    "departureWorkTime" time without time zone,
    "arrivalHomeTime" time without time zone,
    "morningPlace" character varying,
    "morningMedicineTime" time without time zone,
    "eveningPlace" character varying,
    "eveningMedicineTime" time without time zone,
    "medicineStorage" character varying,
    "toolsAndCues" character varying,
    goal character varying,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "morningWeekendPlace" character varying,
    "eveningWeekendPlace" character varying,
    "patientVisitID" uuid DEFAULT public.uuid_generate_v4()
);


ALTER TABLE public."timeAndWork" OWNER TO postgres;

--
-- Name: uptake; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uptake (
    id uuid NOT NULL,
    "timeAndWorkID" uuid,
    "currentDate" timestamp with time zone,
    "morningStatus" boolean,
    "eveningStatus" boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.uptake OWNER TO postgres;

--
-- Name: userNotifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."userNotifications" (
    id uuid NOT NULL,
    "notificationID" uuid,
    "patientID" uuid,
    notifications json,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


ALTER TABLE public."userNotifications" OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    "firstName" character varying(255),
    "middleName" character varying(255),
    "lastName" character varying(255),
    email character varying(255),
    gender character varying(255),
    "phoneNo" character varying(255),
    "countyID" integer,
    password character varying(255),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    dob date DEFAULT '1970-01-01'::date,
    "idNo" character varying,
    sex character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: viralLoad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."viralLoad" (
    id uuid NOT NULL,
    "userID" uuid,
    "patientID" uuid,
    "vlResults" integer,
    "isVLValid" boolean,
    "vlJustification" character varying,
    "dateOfVL" character varying,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


ALTER TABLE public."viralLoad" OWNER TO postgres;

--
-- Name: viralLoads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."viralLoads" (
    id uuid NOT NULL,
    "vlResults" integer,
    "isVLValid" boolean DEFAULT false,
    "patientID" uuid,
    "userID" uuid,
    "vlJustification" character varying(255),
    "dateOfVL" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "dateOfNextVL" date
);


ALTER TABLE public."viralLoads" OWNER TO postgres;

--
-- Name: vitalSigns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."vitalSigns" (
    id uuid NOT NULL,
    "patientID" uuid,
    "patientVisitID" uuid,
    bmi character varying(255),
    temperature character varying(255),
    weight character varying(255),
    height character varying(255),
    systolic character varying(255),
    diastolic character varying(255),
    muac character varying(255),
    "nutritionalStatus" character varying(255),
    "oxygenSAturation" character varying(255),
    "pulseRate" character varying(255),
    "respiratoryRate" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    lmp date,
    gravida character varying(255),
    parity character varying(255),
    edd character varying(255)
);


ALTER TABLE public."vitalSigns" OWNER TO postgres;

--
-- Name: wards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wards (
    id integer NOT NULL,
    "subCountyID" integer,
    ward character varying,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone
);


ALTER TABLE public.wards OWNER TO postgres;

--
-- Name: wards_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.wards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.wards_id_seq OWNER TO postgres;

--
-- Name: wards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.wards_id_seq OWNED BY public.wards.id;


--
-- Name: counties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.counties ALTER COLUMN id SET DEFAULT nextval('public.counties_id_seq'::regclass);


--
-- Name: hospitals id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospitals ALTER COLUMN id SET DEFAULT nextval('public.hospitals_id_seq'::regclass);


--
-- Name: otzEnrollments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."otzEnrollments" ALTER COLUMN id SET DEFAULT nextval('public."otzEnrollments_id_seq"'::regclass);


--
-- Name: schools id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schools ALTER COLUMN id SET DEFAULT nextval('public.schools_id_seq'::regclass);


--
-- Name: subCounties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."subCounties" ALTER COLUMN id SET DEFAULT nextval('public."subCounties_id_seq"'::regclass);


--
-- Name: wards id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wards ALTER COLUMN id SET DEFAULT nextval('public.wards_id_seq'::regclass);


--
-- Name: SMSWhatsapp SMSWhatsapp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SMSWhatsapp"
    ADD CONSTRAINT "SMSWhatsapp_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: allergies allergies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.allergies
    ADD CONSTRAINT allergies_pkey PRIMARY KEY (id);


--
-- Name: appointmentAgendas appointmentAgendas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."appointmentAgendas"
    ADD CONSTRAINT "appointmentAgendas_pkey" PRIMARY KEY (id);


--
-- Name: appointmentStatus appointmentStatus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."appointmentStatus"
    ADD CONSTRAINT "appointmentStatus_pkey" PRIMARY KEY (id);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- Name: artCategories artCategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."artCategories"
    ADD CONSTRAINT "artCategories_pkey" PRIMARY KEY (id);


--
-- Name: artPrescriptions artPrescriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."artPrescriptions"
    ADD CONSTRAINT "artPrescriptions_pkey" PRIMARY KEY (id);


--
-- Name: artRegimenPhases artRegimenPhases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."artRegimenPhases"
    ADD CONSTRAINT "artRegimenPhases_pkey" PRIMARY KEY (id);


--
-- Name: artRegimenSwitch artRegimenSwitch_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."artRegimenSwitch"
    ADD CONSTRAINT "artRegimenSwitch_pkey" PRIMARY KEY (id);


--
-- Name: artSwitchReasons artSwitchReasons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."artSwitchReasons"
    ADD CONSTRAINT "artSwitchReasons_pkey" PRIMARY KEY (id);


--
-- Name: articleCategories articleCategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."articleCategories"
    ADD CONSTRAINT "articleCategories_pkey" PRIMARY KEY (id);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: arts arts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arts
    ADD CONSTRAINT arts_pkey PRIMARY KEY (id);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: caregivers caregivers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caregivers
    ADD CONSTRAINT caregivers_pkey PRIMARY KEY (id);


--
-- Name: caseManagers caseManagers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."caseManagers"
    ADD CONSTRAINT "caseManagers_pkey" PRIMARY KEY (id);


--
-- Name: chapters chapters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chapters
    ADD CONSTRAINT chapters_pkey PRIMARY KEY (id);


--
-- Name: chatMessages chatMessages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."chatMessages"
    ADD CONSTRAINT "chatMessages_pkey" PRIMARY KEY (id);


--
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);


--
-- Name: childCaregiverReadiness childCaregiverReadiness_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."childCaregiverReadiness"
    ADD CONSTRAINT "childCaregiverReadiness_pkey" PRIMARY KEY (id);


--
-- Name: childDisclosureEligibility childDisclosureEligibility_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."childDisclosureEligibility"
    ADD CONSTRAINT "childDisclosureEligibility_pkey" PRIMARY KEY (id);


--
-- Name: chronicIllness chronicIllness_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."chronicIllness"
    ADD CONSTRAINT "chronicIllness_pkey" PRIMARY KEY (id);


--
-- Name: counties counties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.counties
    ADD CONSTRAINT counties_pkey PRIMARY KEY (id);


--
-- Name: disclosureChecklist disclosureChecklist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."disclosureChecklist"
    ADD CONSTRAINT "disclosureChecklist_pkey" PRIMARY KEY (id);


--
-- Name: disclosureChecklists disclosureChecklists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."disclosureChecklists"
    ADD CONSTRAINT "disclosureChecklists_pkey" PRIMARY KEY (id);


--
-- Name: followUpChecklist followUpChecklist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."followUpChecklist"
    ADD CONSTRAINT "followUpChecklist_pkey" PRIMARY KEY (id);


--
-- Name: homeVisitFrequencies homeVisitFrequencies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."homeVisitFrequencies"
    ADD CONSTRAINT "homeVisitFrequencies_pkey" PRIMARY KEY (id);


--
-- Name: homeVisitReasons homeVisitReasons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."homeVisitReasons"
    ADD CONSTRAINT "homeVisitReasons_pkey" PRIMARY KEY (id);


--
-- Name: homeVisits homeVisits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."homeVisits"
    ADD CONSTRAINT "homeVisits_pkey" PRIMARY KEY (id);


--
-- Name: hospitals hospitals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospitals
    ADD CONSTRAINT hospitals_pkey PRIMARY KEY (id);


--
-- Name: internalLabRequests internalLabRequests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."internalLabRequests"
    ADD CONSTRAINT "internalLabRequests_pkey" PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: measuringUnits measuringUnits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."measuringUnits"
    ADD CONSTRAINT "measuringUnits_pkey" PRIMARY KEY (id);


--
-- Name: messageTextReplies messageTextReplies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."messageTextReplies"
    ADD CONSTRAINT "messageTextReplies_pkey" PRIMARY KEY (id);


--
-- Name: mmasEight mmasEight_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."mmasEight"
    ADD CONSTRAINT "mmasEight_pkey" PRIMARY KEY (id);


--
-- Name: mmasFour mmasFour_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."mmasFour"
    ADD CONSTRAINT "mmasFour_pkey" PRIMARY KEY (id);


--
-- Name: mmas mmas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mmas
    ADD CONSTRAINT mmas_pkey PRIMARY KEY (id);


--
-- Name: nextOfKin nextOfKin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."nextOfKin"
    ADD CONSTRAINT "nextOfKin_pkey" PRIMARY KEY (id);


--
-- Name: notificationCategories notificationCategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."notificationCategories"
    ADD CONSTRAINT "notificationCategories_pkey" PRIMARY KEY (id);


--
-- Name: notificationSubCategories notificationSubCategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."notificationSubCategories"
    ADD CONSTRAINT "notificationSubCategories_pkey" PRIMARY KEY (id);


--
-- Name: notificationTypes notificationTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."notificationTypes"
    ADD CONSTRAINT "notificationTypes_pkey" PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: occupations occupations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.occupations
    ADD CONSTRAINT occupations_pkey PRIMARY KEY (id);


--
-- Name: otzEnrollments otzEnrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."otzEnrollments"
    ADD CONSTRAINT "otzEnrollments_pkey" PRIMARY KEY (id);


--
-- Name: pamaProfile pamaProfile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pamaProfile"
    ADD CONSTRAINT "pamaProfile_pkey" PRIMARY KEY (id);


--
-- Name: partialDisclosure partialDisclosure_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."partialDisclosure"
    ADD CONSTRAINT "partialDisclosure_pkey" PRIMARY KEY (id);


--
-- Name: patientAllergies patientAllergies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."patientAllergies"
    ADD CONSTRAINT "patientAllergies_pkey" PRIMARY KEY (id);


--
-- Name: patientNotifications patientNotifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."patientNotifications"
    ADD CONSTRAINT "patientNotifications_pkey" PRIMARY KEY (id);


--
-- Name: patientVisits patientVisits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."patientVisits"
    ADD CONSTRAINT "patientVisits_pkey" PRIMARY KEY (id);


--
-- Name: patients patients_cccNo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT "patients_cccNo_key" UNIQUE ("cccNo");


--
-- Name: patients patients_idNo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT "patients_idNo_key" UNIQUE ("idNo");


--
-- Name: patients patients_phoneNo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT "patients_phoneNo_key" UNIQUE ("phoneNo");


--
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- Name: pills pills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pills
    ADD CONSTRAINT pills_pkey PRIMARY KEY (id);


--
-- Name: pmtctProfile pmtctProfile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pmtctProfile"
    ADD CONSTRAINT "pmtctProfile_pkey" PRIMARY KEY (id);


--
-- Name: prescriptions prescriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescriptions
    ADD CONSTRAINT prescriptions_pkey PRIMARY KEY (id);


--
-- Name: schoolTermHolidays schoolTermHolidays_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."schoolTermHolidays"
    ADD CONSTRAINT "schoolTermHolidays_pkey" PRIMARY KEY (id);


--
-- Name: schoolTerms schoolTerms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."schoolTerms"
    ADD CONSTRAINT "schoolTerms_pkey" PRIMARY KEY (id);


--
-- Name: schools schools_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schools
    ADD CONSTRAINT schools_pkey PRIMARY KEY (id);


--
-- Name: subCounties subCounties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."subCounties"
    ADD CONSTRAINT "subCounties_pkey" PRIMARY KEY (id);


--
-- Name: timeAndWork timeAndWork_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."timeAndWork"
    ADD CONSTRAINT "timeAndWork_pkey" PRIMARY KEY (id);


--
-- Name: uptake uptake_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uptake
    ADD CONSTRAINT uptake_pkey PRIMARY KEY (id);


--
-- Name: userNotifications userNotifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userNotifications"
    ADD CONSTRAINT "userNotifications_pkey" PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: viralLoad viralLoad_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."viralLoad"
    ADD CONSTRAINT "viralLoad_pkey" PRIMARY KEY (id);


--
-- Name: viralLoads viralLoads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."viralLoads"
    ADD CONSTRAINT "viralLoads_pkey" PRIMARY KEY (id);


--
-- Name: vitalSigns vitalSigns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."vitalSigns"
    ADD CONSTRAINT "vitalSigns_pkey" PRIMARY KEY (id);


--
-- Name: wards wards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wards
    ADD CONSTRAINT wards_pkey PRIMARY KEY (id);


--
-- Name: artCategories artCategories_artPhaseID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."artCategories"
    ADD CONSTRAINT "artCategories_artPhaseID_fkey" FOREIGN KEY ("artPhaseID") REFERENCES public."artRegimenPhases"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: artPrescriptions artPrescriptions_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."artPrescriptions"
    ADD CONSTRAINT "artPrescriptions_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: artRegimenSwitch artRegimenSwitch_artID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."artRegimenSwitch"
    ADD CONSTRAINT "artRegimenSwitch_artID_fkey" FOREIGN KEY ("artID") REFERENCES public.arts(id) ON UPDATE CASCADE;


--
-- Name: artRegimenSwitch artRegimenSwitch_regimenLineID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."artRegimenSwitch"
    ADD CONSTRAINT "artRegimenSwitch_regimenLineID_fkey" FOREIGN KEY ("regimenLineID") REFERENCES public."artRegimenPhases"(id) ON UPDATE CASCADE;


--
-- Name: artRegimenSwitch artRegimenSwitch_switchReasonID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."artRegimenSwitch"
    ADD CONSTRAINT "artRegimenSwitch_switchReasonID_fkey" FOREIGN KEY ("switchReasonID") REFERENCES public."artSwitchReasons"(id) ON UPDATE CASCADE;


--
-- Name: articles articles_chapterID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT "articles_chapterID_fkey" FOREIGN KEY ("chapterID") REFERENCES public.chapters(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: articles articles_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT "articles_userID_fkey" FOREIGN KEY ("userID") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: arts arts_artCategoryID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arts
    ADD CONSTRAINT "arts_artCategoryID_fkey" FOREIGN KEY ("artCategoryID") REFERENCES public."artCategories"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: arts arts_measuringUnitID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arts
    ADD CONSTRAINT "arts_measuringUnitID_fkey" FOREIGN KEY ("measuringUnitID") REFERENCES public."measuringUnits"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: caregivers caregivers_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caregivers
    ADD CONSTRAINT "caregivers_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON DELETE CASCADE;


--
-- Name: caseManagers caseManagers_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."caseManagers"
    ADD CONSTRAINT "caseManagers_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: caseManagers caseManagers_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."caseManagers"
    ADD CONSTRAINT "caseManagers_userID_fkey" FOREIGN KEY ("userID") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: chapters chapters_bookID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chapters
    ADD CONSTRAINT "chapters_bookID_fkey" FOREIGN KEY ("bookID") REFERENCES public.books(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: childCaregiverReadiness childCaregiverReadiness_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."childCaregiverReadiness"
    ADD CONSTRAINT "childCaregiverReadiness_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE;


--
-- Name: childCaregiverReadiness childCaregiverReadiness_patientVisitID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."childCaregiverReadiness"
    ADD CONSTRAINT "childCaregiverReadiness_patientVisitID_fkey" FOREIGN KEY ("patientVisitID") REFERENCES public."patientVisits"(id) ON UPDATE CASCADE;


--
-- Name: childDisclosureEligibility childDisclosureEligibility_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."childDisclosureEligibility"
    ADD CONSTRAINT "childDisclosureEligibility_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE;


--
-- Name: childDisclosureEligibility childDisclosureEligibility_patientVisitID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."childDisclosureEligibility"
    ADD CONSTRAINT "childDisclosureEligibility_patientVisitID_fkey" FOREIGN KEY ("patientVisitID") REFERENCES public."patientVisits"(id) ON UPDATE CASCADE;


--
-- Name: chronicIllness chronicIllness_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."chronicIllness"
    ADD CONSTRAINT "chronicIllness_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: disclosureChecklist disclosureChecklist_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."disclosureChecklist"
    ADD CONSTRAINT "disclosureChecklist_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE;


--
-- Name: disclosureChecklist disclosureChecklist_patientVisitID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."disclosureChecklist"
    ADD CONSTRAINT "disclosureChecklist_patientVisitID_fkey" FOREIGN KEY ("patientVisitID") REFERENCES public."patientVisits"(id) ON UPDATE CASCADE;


--
-- Name: artPrescriptions fk_patient_visit; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."artPrescriptions"
    ADD CONSTRAINT fk_patient_visit FOREIGN KEY ("patientVisitID") REFERENCES public."patientVisits"(id);


--
-- Name: prescriptions fk_patient_visit_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescriptions
    ADD CONSTRAINT fk_patient_visit_id FOREIGN KEY ("patientVisitID") REFERENCES public."patientVisits"(id);


--
-- Name: appointments fk_patientvisit; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT fk_patientvisit FOREIGN KEY ("patientVisitID") REFERENCES public."patientVisits"(id);


--
-- Name: followUpChecklist followUpChecklist_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."followUpChecklist"
    ADD CONSTRAINT "followUpChecklist_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE;


--
-- Name: followUpChecklist followUpChecklist_patientVisitID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."followUpChecklist"
    ADD CONSTRAINT "followUpChecklist_patientVisitID_fkey" FOREIGN KEY ("patientVisitID") REFERENCES public.patients(id) ON UPDATE CASCADE;


--
-- Name: homeVisits homeVisits_artPrescriptionID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."homeVisits"
    ADD CONSTRAINT "homeVisits_artPrescriptionID_fkey" FOREIGN KEY ("artPrescriptionID") REFERENCES public.arts(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: homeVisits homeVisits_homeVisitFrequencyID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."homeVisits"
    ADD CONSTRAINT "homeVisits_homeVisitFrequencyID_fkey" FOREIGN KEY ("homeVisitFrequencyID") REFERENCES public."homeVisitFrequencies"(id) ON DELETE CASCADE;


--
-- Name: homeVisits homeVisits_homeVisitReasonID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."homeVisits"
    ADD CONSTRAINT "homeVisits_homeVisitReasonID_fkey" FOREIGN KEY ("homeVisitReasonID") REFERENCES public."homeVisitReasons"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: homeVisits homeVisits_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."homeVisits"
    ADD CONSTRAINT "homeVisits_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE;


--
-- Name: homeVisits homeVisits_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."homeVisits"
    ADD CONSTRAINT "homeVisits_userID_fkey" FOREIGN KEY ("userID") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: internalLabRequests internalLabRequests_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."internalLabRequests"
    ADD CONSTRAINT "internalLabRequests_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE;


--
-- Name: locations locations_locationID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT "locations_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES public.locations(id) ON DELETE CASCADE;


--
-- Name: locations locations_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT "locations_userID_fkey" FOREIGN KEY ("userID") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: mmasEight mmasEight_mmasFourID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."mmasEight"
    ADD CONSTRAINT "mmasEight_mmasFourID_fkey" FOREIGN KEY ("mmasFourID") REFERENCES public."mmasFour"(id) ON UPDATE CASCADE;


--
-- Name: mmasEight mmasEight_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."mmasEight"
    ADD CONSTRAINT "mmasEight_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE;


--
-- Name: mmasEight mmasEight_patientVisitID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."mmasEight"
    ADD CONSTRAINT "mmasEight_patientVisitID_fkey" FOREIGN KEY ("patientVisitID") REFERENCES public."patientVisits"(id) ON UPDATE CASCADE;


--
-- Name: mmasFour mmasFour_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."mmasFour"
    ADD CONSTRAINT "mmasFour_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE;


--
-- Name: mmasFour mmasFour_patientVisitID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."mmasFour"
    ADD CONSTRAINT "mmasFour_patientVisitID_fkey" FOREIGN KEY ("patientVisitID") REFERENCES public."patientVisits"(id) ON UPDATE CASCADE;


--
-- Name: mmas mmas_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mmas
    ADD CONSTRAINT "mmas_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE;


--
-- Name: mmas mmas_patientVisitID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mmas
    ADD CONSTRAINT "mmas_patientVisitID_fkey" FOREIGN KEY ("patientVisitID") REFERENCES public."patientVisits"(id) ON UPDATE CASCADE;


--
-- Name: nextOfKin nextOfKin_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."nextOfKin"
    ADD CONSTRAINT "nextOfKin_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: notificationSubCategories notificationSubCategories_notificationCategoryID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."notificationSubCategories"
    ADD CONSTRAINT "notificationSubCategories_notificationCategoryID_fkey" FOREIGN KEY ("notificationCategoryID") REFERENCES public."notificationCategories"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: notifications notifications_notificationSubCategoryID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "notifications_notificationSubCategoryID_fkey" FOREIGN KEY ("notificationSubCategoryID") REFERENCES public."notificationSubCategories"(id) ON UPDATE CASCADE;


--
-- Name: otzEnrollments otzEnrollments_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."otzEnrollments"
    ADD CONSTRAINT "otzEnrollments_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE;


--
-- Name: partialDisclosure partialDisclosure_childCaregiverReadinessID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."partialDisclosure"
    ADD CONSTRAINT "partialDisclosure_childCaregiverReadinessID_fkey" FOREIGN KEY ("childCaregiverReadinessID") REFERENCES public."childCaregiverReadiness"(id) ON UPDATE CASCADE;


--
-- Name: partialDisclosure partialDisclosure_childDisclosureEligibilityID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."partialDisclosure"
    ADD CONSTRAINT "partialDisclosure_childDisclosureEligibilityID_fkey" FOREIGN KEY ("childDisclosureEligibilityID") REFERENCES public."childDisclosureEligibility"(id) ON UPDATE CASCADE;


--
-- Name: patientNotifications patientNotifications_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."patientNotifications"
    ADD CONSTRAINT "patientNotifications_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE;


--
-- Name: patientNotifications patientNotifications_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."patientNotifications"
    ADD CONSTRAINT "patientNotifications_userID_fkey" FOREIGN KEY ("userID") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: patientVisits patientVisits_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."patientVisits"
    ADD CONSTRAINT "patientVisits_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pills pills_artID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pills
    ADD CONSTRAINT "pills_artID_fkey" FOREIGN KEY ("artID") REFERENCES public.arts(id) ON UPDATE CASCADE;


--
-- Name: pmtctProfile pmtctProfile_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."pmtctProfile"
    ADD CONSTRAINT "pmtctProfile_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: schoolTermHolidays schoolTermHolidays_schoolTermID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."schoolTermHolidays"
    ADD CONSTRAINT "schoolTermHolidays_schoolTermID_fkey" FOREIGN KEY ("schoolTermID") REFERENCES public."schoolTerms"(id) ON UPDATE CASCADE;


--
-- Name: users users_countyID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_countyID_fkey" FOREIGN KEY ("countyID") REFERENCES public.counties(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: viralLoads viralLoads_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."viralLoads"
    ADD CONSTRAINT "viralLoads_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE;


--
-- Name: viralLoads viralLoads_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."viralLoads"
    ADD CONSTRAINT "viralLoads_userID_fkey" FOREIGN KEY ("userID") REFERENCES public.users(id);


--
-- Name: vitalSigns vitalSigns_patientID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."vitalSigns"
    ADD CONSTRAINT "vitalSigns_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES public.patients(id) ON UPDATE CASCADE;


--
-- Name: vitalSigns vitalSigns_patientVisitID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."vitalSigns"
    ADD CONSTRAINT "vitalSigns_patientVisitID_fkey" FOREIGN KEY ("patientVisitID") REFERENCES public."patientVisits"(id) ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--

