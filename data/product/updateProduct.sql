UPDATE [dbo].[Product]
SET [pname]=@pname
    ,[description]=@description
    ,[price]=@price
    ,[amount]=@amount
WHERE [pid]=@pid

SELECT *
FROM [dbo].[Product]
WHERE [pid]=@pid