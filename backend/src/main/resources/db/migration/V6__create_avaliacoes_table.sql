CREATE TABLE avaliacoes (
    id BIGSERIAL PRIMARY KEY,
    event_id BIGINT NOT NULL REFERENCES events(id),
    reviewer_id BIGINT NOT NULL REFERENCES users(id),
    reviewed_id BIGINT NOT NULL REFERENCES users(id),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_avaliacoes_event_reviewer UNIQUE (event_id, reviewer_id)
);