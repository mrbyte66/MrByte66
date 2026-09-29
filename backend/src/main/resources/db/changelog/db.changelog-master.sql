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

--changeset mrbyte66:4
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  slug VARCHAR(200) NOT NULL UNIQUE,
  title VARCHAR(300) NOT NULL,
  summary VARCHAR(500),
  content TEXT NOT NULL,
  demo_url VARCHAR(500),
  source_url VARCHAR(500),
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ
);
CREATE TABLE project_technologies (
  project_id BIGINT NOT NULL REFERENCES projects (id),
  technology VARCHAR(100) NOT NULL
);

--changeset mrbyte66:5
INSERT INTO projects (id, slug, title, summary, content, demo_url, source_url, status, created_at) VALUES
  (1, 'mrbyte66-platform', 'MrByte66 Platform', 'Kişisel dijital platform: yazılar, projeler ve bilgi arşivi.',
   'Spring Boot + Next.js ile geliştirilen modüler monolit kişisel platform.', NULL, 'https://github.com/mrbyte66/MrByte66', 'PUBLISHED', NOW());
INSERT INTO project_technologies (project_id, technology) VALUES
  (1, 'Java 25'), (1, 'Spring Boot'), (1, 'Next.js'), (1, 'PostgreSQL');
SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));
