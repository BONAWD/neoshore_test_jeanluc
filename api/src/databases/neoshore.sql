PGDMP         9                 {            neoshore    15.1    15.1 	    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16398    neoshore    DATABASE     {   CREATE DATABASE neoshore WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
    DROP DATABASE neoshore;
                postgres    false            ?            1259    16402    task    TABLE     ?   CREATE TABLE public.task (
    id integer NOT NULL,
    title character varying(50),
    message character varying(250),
    status character varying(50)
);
    DROP TABLE public.task;
       public         heap    postgres    false            ?            1259    16407    task_id_seq    SEQUENCE     ?   ALTER TABLE public.task ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            ?          0    16402    task 
   TABLE DATA           :   COPY public.task (id, title, message, status) FROM stdin;
    public          postgres    false    214   k       ?           0    0    task_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.task_id_seq', 11, true);
          public          postgres    false    215            f           2606    16406    task task_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.task DROP CONSTRAINT task_pkey;
       public            postgres    false    214            ?   u   x?3?,I-.a???????T0?/?D!9?? '?$5?ˌ3?(%3/?$??H? ??$1)'?37?OI???ҼT?Ԣ" ? cN?Ԝ?|??s???d?e&'?d???r???b???? ??A&     