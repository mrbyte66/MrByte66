--liquibase formatted sql

--changeset mrbyte66:1
CREATE TABLE articles (
  id BIGSERIAL PRIMARY KEY,
  slug VARCHAR(200) NOT NULL UNIQUE,
  title VARCHAR(300) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ
);

--changeset mrbyte66:2
INSERT INTO articles (slug, title, content, status, created_at) VALUES
  ('hos-geldin', 'MrByte66''ye Hoş Geldin', 'Bu platformun ilk yazısıdır.', 'PUBLISHED', NOW()),
  ('ilk-teknik-not', 'İlk Teknik Not', 'Backend, frontend ve veritabanı uçtan uca konuşuyor.', 'PUBLISHED', NOW()),
  ('taslak-yazi', 'Taslak Yazı', 'Bu yazı henüz yayınlanmadı.', 'DRAFT', NOW());

--changeset mrbyte66:3
CREATE TABLE app_users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);
