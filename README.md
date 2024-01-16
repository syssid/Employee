ADD THESE TABLE AND STORED PROCEDURE TO YOUR DATABASE.
EDIT WEB.CONFIG ACCORDINGLY.
REST OF THE THING YOU KNOW.. I THINK.

--------------------------------------------------------------------------------------------------

CREATE TABLE [dbo].[Employee] (
    [Employee_ID] VARCHAR (20)  NOT NULL,
    [Name]        VARCHAR (100) NULL,
    [DOB]         VARCHAR (50)  NULL,
    [Age]         INT           NULL,
    [Gender]      VARCHAR (10)  NULL,
    [Contact]     VARCHAR (15)  NULL,
    [Email]       VARCHAR (100) NULL,
    [Education]   VARCHAR (50)  NULL,
    [PassingYear] VARCHAR (5)   NULL,
    [Percentage]  VARCHAR (10)  NULL,
    [Photo]       VARCHAR (100) NULL,
    [CreatedOn]   DATETIME      NULL
);
--------------------------------------------------------------------------------------------------------
CREATE TABLE [dbo].[INDICATOR] (
    [X] SMALLINT IDENTITY (0, 5) NOT NULL,
    [Y] SMALLINT NULL
);
-------------------------------------------------------------------------------------------------------------
DECLARE @counter INT = 1;

WHILE @counter <= 1000
BEGIN

    DECLARE @randomValue INT = ROUND(RAND() * 98 + 1, 0);

    INSERT INTO INDICATOR VALUES (@randomValue);

    SET @counter = @counter + 1;
END;
----------------------------------------------------------------------------------------------------------------
CREATE PROCEDURE EmployeeManage    
@EmployeeID Varchar(100),  
@Name Varchar(100),    
@DOB Varchar(50),    
@Age int,    
@Gender Varchar(10),    
@Contact Varchar(15),    
@Email Varchar(100),    
@Education Varchar(50),    
@PassingYear int,    
@Percentage varchar(10),      
@Photo varchar(100),     
@Operation int    
AS    
BEGIN    
if(@Operation = 1)    
BEGIN    
DECLARE @Emp_ID VARCHAR(20)    
DECLARE @LastEmpID INT    
SELECT @LastEmpID = ISNULL(MAX(RIGHT(Employee_ID, 3)), 0) FROM Employee    
SET @LastEmpID = @LastEmpID + 1    
SET @Emp_ID = 'EMP' + RIGHT('000' + CAST(@LastEmpID AS VARCHAR(3)), 3)    
INSERT INTO Employee(Employee_ID, Name, DOB, Age, Gender, Contact, Email, Education, PassingYear, Percentage, Photo, CreatedOn)    
VALUES (@Emp_ID, @Name, @DOB, @Age, @Gender, @Contact, @Email , @Education, @PassingYear, @Percentage, @Photo, GETDATE())    
SELECT Name FROM Employee WHERE Employee_ID = @Emp_ID    
END    
ELSE IF (@Operation = 2)    
BEGIN    
SELECT Employee_ID, Name, DOB, Age, Gender, Contact, Email, Education, PassingYear, Percentage, Photo FROM Employee    
END    
ELSE IF(@Operation = 3)  
BEGIN  
DELETE FROM Employee WHERE Employee_ID = @EmployeeID  
END  
ELSE IF(@Operation = 4)  
BEGIN  
UPDATE Employee SET Name = @Name, DOB = @DOB, Age = @Age, Gender = @Gender, Contact = @Contact , Email = @Email, Education = @Education, PassingYear = @PassingYear, Percentage = @Percentage  WHERE Employee_ID = @EmployeeID  
END  
ELSE IF (@Operation = 5)  
BEGIN  
SELECT * FROM INDICATOR  
END  
END
----------------------------------------------------------------------------------------------------------------------------------------
