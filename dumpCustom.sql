PGDMP     :    	        	        {            boards    15.1    15.1 H    P           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Q           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            R           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            S           1262    33494    boards    DATABASE     z   CREATE DATABASE boards WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE boards;
                postgres    false            �            1259    33554    attachments    TABLE        CREATE TABLE public.attachments (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    path character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    date timestamp without time zone,
    task_id integer NOT NULL
);
    DROP TABLE public.attachments;
       public         heap    postgres    false            �            1259    33553    attachments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attachments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.attachments_id_seq;
       public          postgres    false    225            T           0    0    attachments_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.attachments_id_seq OWNED BY public.attachments.id;
          public          postgres    false    224            �            1259    33527    blocks    TABLE     �   CREATE TABLE public.blocks (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    board_id integer NOT NULL
);
    DROP TABLE public.blocks;
       public         heap    postgres    false            �            1259    33526    blocks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.blocks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.blocks_id_seq;
       public          postgres    false    221            U           0    0    blocks_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.blocks_id_seq OWNED BY public.blocks.id;
          public          postgres    false    220            �            1259    33518    boards    TABLE     �   CREATE TABLE public.boards (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    creation_date timestamp without time zone,
    image character varying(255)
);
    DROP TABLE public.boards;
       public         heap    postgres    false            �            1259    33517    boards_id_seq    SEQUENCE     �   CREATE SEQUENCE public.boards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.boards_id_seq;
       public          postgres    false    219            V           0    0    boards_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.boards_id_seq OWNED BY public.boards.id;
          public          postgres    false    218            �            1259    33590    invites    TABLE     �   CREATE TABLE public.invites (
    id integer NOT NULL,
    invited_id integer NOT NULL,
    inviting_id integer NOT NULL,
    board_id integer NOT NULL
);
    DROP TABLE public.invites;
       public         heap    postgres    false            �            1259    33589    invites_id_seq    SEQUENCE     �   CREATE SEQUENCE public.invites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.invites_id_seq;
       public          postgres    false    229            W           0    0    invites_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.invites_id_seq OWNED BY public.invites.id;
          public          postgres    false    228            �            1259    33568    relationships_boards_users    TABLE     �   CREATE TABLE public.relationships_boards_users (
    id integer NOT NULL,
    board_id integer NOT NULL,
    user_id integer NOT NULL,
    role_id integer NOT NULL
);
 .   DROP TABLE public.relationships_boards_users;
       public         heap    postgres    false            �            1259    33567 !   relationships_boards_users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.relationships_boards_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.relationships_boards_users_id_seq;
       public          postgres    false    227            X           0    0 !   relationships_boards_users_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.relationships_boards_users_id_seq OWNED BY public.relationships_boards_users.id;
          public          postgres    false    226            �            1259    33496    roles    TABLE     b   CREATE TABLE public.roles (
    id integer NOT NULL,
    title character varying(255) NOT NULL
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    33495    roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public          postgres    false    215            Y           0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
          public          postgres    false    214            �            1259    33539    tasks    TABLE     �   CREATE TABLE public.tasks (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    block_id integer NOT NULL,
    image character varying(255),
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.tasks;
       public         heap    postgres    false            �            1259    33538    tasks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tasks_id_seq;
       public          postgres    false    223            Z           0    0    tasks_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;
          public          postgres    false    222            �            1259    33505    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    middlename character varying(255),
    login character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    avatar character varying(255),
    email character varying(255) NOT NULL,
    "position" character varying(255)
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    33504    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    217            [           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    216            �           2604    33557    attachments id    DEFAULT     p   ALTER TABLE ONLY public.attachments ALTER COLUMN id SET DEFAULT nextval('public.attachments_id_seq'::regclass);
 =   ALTER TABLE public.attachments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224    225            �           2604    33530 	   blocks id    DEFAULT     f   ALTER TABLE ONLY public.blocks ALTER COLUMN id SET DEFAULT nextval('public.blocks_id_seq'::regclass);
 8   ALTER TABLE public.blocks ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    33521 	   boards id    DEFAULT     f   ALTER TABLE ONLY public.boards ALTER COLUMN id SET DEFAULT nextval('public.boards_id_seq'::regclass);
 8   ALTER TABLE public.boards ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            �           2604    33593 
   invites id    DEFAULT     h   ALTER TABLE ONLY public.invites ALTER COLUMN id SET DEFAULT nextval('public.invites_id_seq'::regclass);
 9   ALTER TABLE public.invites ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    229    229            �           2604    33571    relationships_boards_users id    DEFAULT     �   ALTER TABLE ONLY public.relationships_boards_users ALTER COLUMN id SET DEFAULT nextval('public.relationships_boards_users_id_seq'::regclass);
 L   ALTER TABLE public.relationships_boards_users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    226    227            �           2604    33499    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            �           2604    33542    tasks id    DEFAULT     d   ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);
 7   ALTER TABLE public.tasks ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    33508    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            I          0    33554    attachments 
   TABLE DATA           K   COPY public.attachments (id, title, path, type, date, task_id) FROM stdin;
    public          postgres    false    225   S       E          0    33527    blocks 
   TABLE DATA           5   COPY public.blocks (id, title, board_id) FROM stdin;
    public          postgres    false    221   8S       C          0    33518    boards 
   TABLE DATA           N   COPY public.boards (id, title, description, creation_date, image) FROM stdin;
    public          postgres    false    219   US       M          0    33590    invites 
   TABLE DATA           H   COPY public.invites (id, invited_id, inviting_id, board_id) FROM stdin;
    public          postgres    false    229   rS       K          0    33568    relationships_boards_users 
   TABLE DATA           T   COPY public.relationships_boards_users (id, board_id, user_id, role_id) FROM stdin;
    public          postgres    false    227   �S       ?          0    33496    roles 
   TABLE DATA           *   COPY public.roles (id, title) FROM stdin;
    public          postgres    false    215   �S       G          0    33539    tasks 
   TABLE DATA           N   COPY public.tasks (id, title, description, block_id, image, date) FROM stdin;
    public          postgres    false    223   T       A          0    33505    users 
   TABLE DATA           j   COPY public.users (id, name, surname, middlename, login, password, avatar, email, "position") FROM stdin;
    public          postgres    false    217    T       \           0    0    attachments_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.attachments_id_seq', 4, true);
          public          postgres    false    224            ]           0    0    blocks_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.blocks_id_seq', 5, true);
          public          postgres    false    220            ^           0    0    boards_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.boards_id_seq', 3, true);
          public          postgres    false    218            _           0    0    invites_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.invites_id_seq', 1, true);
          public          postgres    false    228            `           0    0 !   relationships_boards_users_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.relationships_boards_users_id_seq', 4, true);
          public          postgres    false    226            a           0    0    roles_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.roles_id_seq', 3, true);
          public          postgres    false    214            b           0    0    tasks_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.tasks_id_seq', 4, true);
          public          postgres    false    222            c           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 3, true);
          public          postgres    false    216            �           2606    33561    attachments attachments_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.attachments
    ADD CONSTRAINT attachments_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.attachments DROP CONSTRAINT attachments_pkey;
       public            postgres    false    225            �           2606    33532    blocks blocks_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT blocks_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.blocks DROP CONSTRAINT blocks_pkey;
       public            postgres    false    221            �           2606    33525    boards boards_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.boards DROP CONSTRAINT boards_pkey;
       public            postgres    false    219            �           2606    33595    invites invites_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.invites
    ADD CONSTRAINT invites_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.invites DROP CONSTRAINT invites_pkey;
       public            postgres    false    229            �           2606    33573 :   relationships_boards_users relationships_boards_users_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.relationships_boards_users
    ADD CONSTRAINT relationships_boards_users_pkey PRIMARY KEY (id);
 d   ALTER TABLE ONLY public.relationships_boards_users DROP CONSTRAINT relationships_boards_users_pkey;
       public            postgres    false    227            �           2606    33501    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    215            �           2606    33503    roles roles_title_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_title_key UNIQUE (title);
 ?   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_title_key;
       public            postgres    false    215            �           2606    33547    tasks tasks_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            postgres    false    223            �           2606    33516    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    217            �           2606    33514    users users_login_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_login_key UNIQUE (login);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_login_key;
       public            postgres    false    217            �           2606    33512    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    217            �           2606    33562 $   attachments attachments_task_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attachments
    ADD CONSTRAINT attachments_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(id);
 N   ALTER TABLE ONLY public.attachments DROP CONSTRAINT attachments_task_id_fkey;
       public          postgres    false    3232    223    225            �           2606    33533    blocks blocks_board_id_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT blocks_board_id_fkey FOREIGN KEY (board_id) REFERENCES public.boards(id);
 E   ALTER TABLE ONLY public.blocks DROP CONSTRAINT blocks_board_id_fkey;
       public          postgres    false    219    221    3228            �           2606    33596    invites invites_board_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.invites
    ADD CONSTRAINT invites_board_id_fkey FOREIGN KEY (board_id) REFERENCES public.boards(id);
 G   ALTER TABLE ONLY public.invites DROP CONSTRAINT invites_board_id_fkey;
       public          postgres    false    229    3228    219            �           2606    33601    invites invites_invited_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invites
    ADD CONSTRAINT invites_invited_id_fkey FOREIGN KEY (invited_id) REFERENCES public.users(id);
 I   ALTER TABLE ONLY public.invites DROP CONSTRAINT invites_invited_id_fkey;
       public          postgres    false    217    229    3226            �           2606    33606     invites invites_inviting_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.invites
    ADD CONSTRAINT invites_inviting_id_fkey FOREIGN KEY (inviting_id) REFERENCES public.users(id);
 J   ALTER TABLE ONLY public.invites DROP CONSTRAINT invites_inviting_id_fkey;
       public          postgres    false    229    217    3226            �           2606    33574 C   relationships_boards_users relationships_boards_users_board_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.relationships_boards_users
    ADD CONSTRAINT relationships_boards_users_board_id_fkey FOREIGN KEY (board_id) REFERENCES public.boards(id);
 m   ALTER TABLE ONLY public.relationships_boards_users DROP CONSTRAINT relationships_boards_users_board_id_fkey;
       public          postgres    false    227    219    3228            �           2606    33584 B   relationships_boards_users relationships_boards_users_role_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.relationships_boards_users
    ADD CONSTRAINT relationships_boards_users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);
 l   ALTER TABLE ONLY public.relationships_boards_users DROP CONSTRAINT relationships_boards_users_role_id_fkey;
       public          postgres    false    215    3218    227            �           2606    33579 B   relationships_boards_users relationships_boards_users_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.relationships_boards_users
    ADD CONSTRAINT relationships_boards_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 l   ALTER TABLE ONLY public.relationships_boards_users DROP CONSTRAINT relationships_boards_users_user_id_fkey;
       public          postgres    false    227    217    3226            �           2606    33548    tasks tasks_block_id_fkey    FK CONSTRAINT     z   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_block_id_fkey FOREIGN KEY (block_id) REFERENCES public.blocks(id);
 C   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_block_id_fkey;
       public          postgres    false    223    221    3230            I      x������ � �      E      x������ � �      C      x������ � �      M      x������ � �      K      x������ � �      ?   G   x�3�0�{.츰����.6\�p��¾�\F��\��ފ$h�ya��v ����.�=... �],�      G      x������ � �      A      x������ � �     