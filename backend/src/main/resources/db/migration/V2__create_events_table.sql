CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    image_url VARCHAR(500),
    date TIMESTAMP NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    available BOOLEAN DEFAULT TRUE
);

INSERT INTO events (name, description, location, image_url, date, price, category) VALUES
('Rock in Rio 2025', 'O maior festival de música do mundo', 'Rio de Janeiro, RJ', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800', '2025-09-15 18:00:00', 595.00, 'Shows'),
('Flamengo x Palmeiras', 'Campeonato Brasileiro - Série A', 'Maracanã, Rio de Janeiro', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800', '2025-08-20 16:00:00', 120.00, 'Esportes'),
('O Fantasma da Ópera', 'Musical clássico da Broadway', 'Teatro Alfa, São Paulo', 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800', '2025-07-10 20:00:00', 250.00, 'Teatro'),
('Lollapalooza Brasil 2025', 'Festival de música alternativa', 'Autódromo de Interlagos, SP', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800', '2025-11-22 12:00:00', 450.00, 'Festivais'),
('Coldplay - Music of the Spheres', 'Turnê mundial', 'Allianz Parque, São Paulo', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', '2025-10-05 19:00:00', 380.00, 'Shows'),
('Copa do Brasil - Final', 'Grande decisão', 'Mineirão, Belo Horizonte', 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800', '2025-09-28 21:00:00', 200.00, 'Esportes'),
('Cirque du Soleil - Kooza', 'Espetáculo circense internacional', 'Parque Villa-Lobos, SP', 'https://images.unsplash.com/photo-1535540878298-a155e5055a80?w=800', '2025-08-15 19:30:00', 320.00, 'Teatro'),
('Primavera Sound SP', 'Festival de música indie', 'Distrito Anhembi, São Paulo', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800', '2025-11-01 14:00:00', 490.00, 'Festivais');
