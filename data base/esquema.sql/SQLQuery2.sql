-- Verificar si la base de datos existe y crearla solo si no existe
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'BiblioApp')
BEGIN
    CREATE DATABASE BiblioApp;
    PRINT 'Base de datos BiblioApp creada.';
END
ELSE
BEGIN
    PRINT 'La base de datos BiblioApp ya existe. Continuando...';
END
GO

-- Usar la base de datos
USE BiblioApp;
GO

-- Verificar y crear tabla categorias
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'categorias' AND xtype = 'U')
BEGIN
    CREATE TABLE categorias (
        id INT IDENTITY PRIMARY KEY,
        nombre NVARCHAR(100) NOT NULL,
        descripcion NVARCHAR(255)
    );
    PRINT 'Tabla categorias creada.';
END
ELSE
BEGIN
    PRINT 'La tabla categorias ya existe. No se creó de nuevo.';
END
GO

-- Verificar y crear tabla autores
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'autores' AND xtype = 'U')
BEGIN
    CREATE TABLE autores (
        id INT IDENTITY PRIMARY KEY,
        nombre NVARCHAR(150) NOT NULL
    );
    PRINT 'Tabla autores creada.';
END
ELSE
BEGIN
    PRINT 'La tabla autores ya existe. No se creó de nuevo.';
END
GO

-- Verificar y crear tabla libros
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'libros' AND xtype = 'U')
BEGIN
    CREATE TABLE libros (
        id INT IDENTITY PRIMARY KEY,
        titulo NVARCHAR(150) NOT NULL,
        isbn NVARCHAR(50),
        categoria_id INT,
        disponible BIT DEFAULT 1,
        CONSTRAINT FK_libros_categorias
            FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    );
    PRINT 'Tabla libros creada.';
END
ELSE
BEGIN
    PRINT 'La tabla libros ya existe. No se creó de nuevo.';
END
GO

-- Verificar y crear tabla libro_autores
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'libro_autores' AND xtype = 'U')
BEGIN
    CREATE TABLE libro_autores (
        id INT IDENTITY PRIMARY KEY,
        libro_id INT,
        autor_id INT,
        CONSTRAINT FK_libro FOREIGN KEY (libro_id) REFERENCES libros(id),
        CONSTRAINT FK_autor FOREIGN KEY (autor_id) REFERENCES autores(id)
    );
    PRINT 'Tabla libro_autores creada.';
END
ELSE
BEGIN
    PRINT 'La tabla libro_autores ya existe. No se creó de nuevo.';
END
GO

-- Verificar y crear tabla usuarios
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'usuarios' AND xtype = 'U')
BEGIN
    CREATE TABLE usuarios (
        id INT IDENTITY PRIMARY KEY,
        nombre NVARCHAR(150),
        email NVARCHAR(100)
    );
    PRINT 'Tabla usuarios creada.';
END
ELSE
BEGIN
    PRINT 'La tabla usuarios ya existe. No se creó de nuevo.';
END
GO

-- Verificar y crear tabla reservas
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name = 'reservas' AND xtype = 'U')
BEGIN
    CREATE TABLE reservas (
        id INT IDENTITY PRIMARY KEY,
        usuario_id INT,
        libro_id INT,
        fecha_reserva DATE,
        fecha_devolucion DATE,
        estado NVARCHAR(20),
        CONSTRAINT FK_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
        CONSTRAINT FK_libro_reserva FOREIGN KEY (libro_id) REFERENCES libros(id)
    );
    PRINT 'Tabla reservas creada.';
END
ELSE
BEGIN
    PRINT 'La tabla reservas ya existe. No se creó de nuevo.';
END
GO

PRINT '=========================================';
PRINT 'Script ejecutado correctamente.';
PRINT 'Todas las estructuras están en su lugar.';
PRINT '=========================================';
GO