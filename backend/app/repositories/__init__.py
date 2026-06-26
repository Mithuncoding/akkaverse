"""
Data-access layer (repositories).

Repositories encapsulate all PostgreSQL queries behind clean methods like
`get_user_by_id()`. Services call repositories, never raw SQL — so the storage
engine can change without touching business logic.
"""
