INSERT INTO [dbo].[Users]
    (
        [name],
        [email],
        [password]
    )
VALUES (
    @name,
    @email,
    @password
)

SELECT SCOPE_IDENTITY() AS uid