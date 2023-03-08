UPDATE [dbo].[Users]
SET [name]=@name
    ,[email]=@email
WHERE [uid]=@uid

SELECT [uid]
        ,[name]
        ,[email]
FROM [dbo].[Users]
WHERE [uid]=@uid