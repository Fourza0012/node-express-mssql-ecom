UPDATE [dbo].[Cart]
SET [amount]=@amount
WHERE [uid]=@uid AND [pid]=@pid

SELECT *
FROM [dbo].[Cart]
WHERE [uid]=@uid AND [pid]=@pid