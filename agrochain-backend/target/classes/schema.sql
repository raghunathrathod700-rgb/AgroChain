-- AgroChain schema (MySQL 8+)
-- Note: when running with spring.jpa.hibernate.ddl-auto=update, Hibernate will manage tables.
-- This file exists as a reference / exportable schema baseline.

create table if not exists roles (
  id binary(16) not null,
  name varchar(32) not null,
  primary key (id),
  unique key uk_roles_name (name)
);

create table if not exists users (
  id binary(16) not null,
  full_name varchar(120) not null,
  email varchar(180) not null,
  password_hash varchar(100) not null,
  phone_number varchar(32),
  address varchar(500),
  blocked bit not null,
  created_at timestamp(6) not null,
  updated_at timestamp(6) not null,
  primary key (id),
  unique key uk_users_email (email)
);

create table if not exists user_roles (
  user_id binary(16) not null,
  role_id binary(16) not null,
  primary key (user_id, role_id),
  constraint fk_user_roles_user foreign key (user_id) references users (id),
  constraint fk_user_roles_role foreign key (role_id) references roles (id)
);

create table if not exists products (
  id binary(16) not null,
  farmer_id binary(16) not null,
  name varchar(140) not null,
  price decimal(12,2) not null,
  quantity int not null,
  category varchar(40) not null,
  image_url varchar(1000),
  description varchar(2000),
  created_at timestamp(6) not null,
  updated_at timestamp(6) not null,
  primary key (id),
  key idx_products_farmer (farmer_id),
  constraint fk_products_farmer foreign key (farmer_id) references users (id)
);

create table if not exists orders (
  id binary(16) not null,
  product_id binary(16) not null,
  buyer_id binary(16) not null,
  farmer_id binary(16) not null,
  quantity int not null,
  total_price decimal(12,2) not null,
  buyer_name varchar(160) not null,
  buyer_email varchar(180) not null,
  delivery_address varchar(600) not null,
  status varchar(30) not null,
  created_at timestamp(6) not null,
  updated_at timestamp(6) not null,
  primary key (id),
  key idx_orders_buyer (buyer_id),
  key idx_orders_farmer (farmer_id),
  constraint fk_orders_product foreign key (product_id) references products (id),
  constraint fk_orders_buyer foreign key (buyer_id) references users (id),
  constraint fk_orders_farmer foreign key (farmer_id) references users (id)
);

create table if not exists payments (
  id binary(16) not null,
  order_id binary(16) not null,
  method varchar(20) not null,
  status varchar(20) not null,
  amount decimal(12,2) not null,
  external_reference varchar(200),
  upi_vpa varchar(100),
  upi_provider_key varchar(120),
  created_at timestamp(6) not null,
  updated_at timestamp(6) not null,
  primary key (id),
  unique key uk_payments_order (order_id),
  constraint fk_payments_order foreign key (order_id) references orders (id)
);

create table if not exists reviews (
  id binary(16) not null,
  buyer_id binary(16) not null,
  farmer_id binary(16) not null,
  rating int not null,
  feedback varchar(1500),
  created_at timestamp(6) not null,
  updated_at timestamp(6) not null,
  primary key (id),
  key idx_reviews_farmer (farmer_id),
  constraint fk_reviews_buyer foreign key (buyer_id) references users (id),
  constraint fk_reviews_farmer foreign key (farmer_id) references users (id)
);

create table if not exists messages (
  id binary(16) not null,
  sender_id binary(16) not null,
  recipient_id binary(16) not null,
  order_id binary(16),
  content varchar(2000) not null,
  created_at timestamp(6) not null,
  updated_at timestamp(6) not null,
  primary key (id),
  key idx_messages_order (order_id),
  constraint fk_messages_sender foreign key (sender_id) references users (id),
  constraint fk_messages_recipient foreign key (recipient_id) references users (id),
  constraint fk_messages_order foreign key (order_id) references orders (id)
);

create table if not exists notifications (
  id binary(16) not null,
  user_id binary(16) not null,
  type varchar(30) not null,
  message varchar(500) not null,
  `read` bit not null,
  created_at timestamp(6) not null,
  updated_at timestamp(6) not null,
  primary key (id),
  key idx_notifications_user (user_id),
  constraint fk_notifications_user foreign key (user_id) references users (id)
);

