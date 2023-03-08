SELECT c.[pid]
	,[pname]
	,[price]
	,[description]
      ,c.[amount]
	  ,p.[amount] as [pamount]
  FROM [dbo].[Cart] c
  JOIN [dbo].[Product] p on c.[pid] = p.[pid]
  WHERE [uid]=@uid