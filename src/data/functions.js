// src/data/functions.js
// Contiene la definición de las funciones de Power Fx para la aplicación.

export const powerFxFunctions = [
  // --- Funciones de Modificación de Datos ---
  {
    id: 'patch',
    name: 'Patch',
    syntax: 'Patch( DataSource, BaseRecord, ChangeRecord1 [, ChangeRecord2, … ] )',
    description: 'Modifica o crea uno o varios registros en un origen de datos, o combina registros fuera de un origen de datos.',
    delegationNotes: 'Delegable para la mayoría de orígenes de datos cuando se usa para modificar registros existentes. La creación de registros puede no ser delegable en todos los casos.',
    examples: [
      {
        title: 'Crear un nuevo registro',
        code: `Patch(Products, Defaults(Products), { Name: "New Product", Price: 19.99, Stock: 100 })`,
        explanation: 'Crea un nuevo producto en la colección "Products".'
      },
      {
        title: 'Modificar un registro existente',
        code: `Patch(Products, LookUp(Products, ID = 1), { Price: 24.99, Stock: Stock - 10 })`,
        explanation: 'Actualiza el precio y el stock del producto con ID 1.'
      }
    ],
    category: 'Modificación de Datos',
    relatedFunctions: ['Collect', 'UpdateIf', 'RemoveIf', 'SubmitForm']
  },
  {
    id: 'collect',
    name: 'Collect',
    syntax: 'Collect( Collection, ItemOrTable [, ItemOrTable2, ... ] )',
    description: 'Añade registros a una colección o crea una colección si no existe. No elimina registros existentes.',
    delegationNotes: 'Generalmente no delegable para la creación inicial desde un origen de datos grande. Las modificaciones a colecciones en memoria son locales.',
    examples: [
      {
        title: 'Añadir un solo registro a una colección',
        code: `Collect(colOrders, {OrderID: "SO1001", Amount: 150.75, Status: "Pending"})`,
        explanation: 'Añade un nuevo pedido a la colección colOrders.'
      },
      {
        title: 'Añadir múltiples registros desde otra tabla o colección',
        code: `Collect(colHighPriorityTasks, Filter(AllTasks, Priority = "High"))`,
        explanation: 'Crea o añade a colHighPriorityTasks todas las tareas de AllTasks que tienen prioridad alta.'
      }
    ],
    category: 'Modificación de Datos',
    relatedFunctions: ['ClearCollect', 'Clear', 'Patch', 'Remove']
  },
  {
    id: 'clearcollect',
    name: 'ClearCollect',
    syntax: 'ClearCollect( Collection, ItemOrTable [, ItemOrTable2, ... ] )',
    description: 'Elimina todos los registros de una colección y luego añade un nuevo conjunto de registros a la misma colección.',
    delegationNotes: 'No delegable para la creación desde un origen de datos grande. Las modificaciones a colecciones son locales.',
    examples: [
      {
        title: 'Inicializar o resetear una colección con datos',
        code: `ClearCollect(colProducts, ShowColumns(ProductsSource, "ID", "Name", "Price"))`,
        explanation: 'Limpia colProducts y la llena con las columnas ID, Name y Price de ProductsSource.'
      }
    ],
    category: 'Modificación de Datos',
    relatedFunctions: ['Collect', 'Clear', 'Patch']
  },
  {
    id: 'clear',
    name: 'Clear',
    syntax: 'Clear( Collection )',
    description: 'Elimina todos los registros de una colección, dejándola vacía.',
    delegationNotes: 'No aplicable (opera en colecciones en memoria).',
    examples: [
      {
        title: 'Vaciar una colección',
        code: `Clear(colTemporaryData)`,
        explanation: 'Elimina todos los registros de colTemporaryData.'
      }
    ],
    category: 'Modificación de Datos',
    relatedFunctions: ['Collect', 'ClearCollect', 'RemoveIf']
  },
  {
    id: 'remove',
    name: 'Remove',
    syntax: 'Remove( DataSource, Record1 [, Record2, ... ] [, All ] )',
    description: 'Elimina uno o más registros específicos de un origen de datos o colección.',
    delegationNotes: 'Delegable para muchos orígenes de datos si se proporcionan los registros completos a eliminar. `RemoveIf` es a menudo más útil para eliminación basada en condiciones.',
    examples: [
      {
        title: 'Eliminar el ítem seleccionado de una galería',
        code: `Remove(colTasks, GalleryTasks.Selected)`,
        explanation: 'Elimina el ítem seleccionado de la colección colTasks.'
      }
    ],
    category: 'Modificación de Datos',
    relatedFunctions: ['RemoveIf', 'Patch', 'Filter']
  },
  {
    id: 'removeif',
    name: 'RemoveIf',
    syntax: 'RemoveIf( DataSource, Condition1 [, Condition2, ... ] )',
    description: 'Elimina registros de un origen de datos o colección que cumplen una o más condiciones.',
    delegationNotes: 'Delegable para muchos orígenes de datos si la condición es delegable.',
    examples: [
      {
        title: 'Eliminar todas las tareas completadas',
        code: `RemoveIf(colTasks, IsDone = true)`,
        explanation: 'Elimina de colTasks todos los registros donde IsDone es true.'
      }
    ],
    category: 'Modificación de Datos',
    relatedFunctions: ['Remove', 'Filter', 'Patch']
  },
  {
    id: 'update',
    name: 'Update',
    syntax: 'Update( DataSource, OldRecord, NewRecord [, PatchFlags ] )',
    description: 'Reemplaza un registro completo en un origen de datos. Todas las columnas del NewRecord deben estar presentes.',
    delegationNotes: 'Delegable. Similar a Patch, pero reemplaza el registro entero en lugar de modificar campos específicos.',
    examples: [
      {
        title: 'Reemplazar un registro de producto',
        code: `Update(Products, LookUp(Products, ID = 1), {ID: 1, Name: "Updated Laptop", Price: 1250.00, Category: "Electronics"})`,
        explanation: 'Reemplaza completamente el producto con ID 1 con los nuevos valores.'
      }
    ],
    category: 'Modificación de Datos',
    relatedFunctions: ['Patch', 'UpdateIf']
  },
  {
    id: 'updateif',
    name: 'UpdateIf',
    syntax: 'UpdateIf( DataSource, Condition, ChangeRecord1 [, ChangeRecord2, ... ] )',
    description: 'Modifica campos específicos de los registros en un origen de datos que cumplen una condición.',
    delegationNotes: 'Delegable si la condición y los cambios son delegables.',
    examples: [
      {
        title: 'Aumentar el precio de todos los productos electrónicos en un 10%',
        code: `UpdateIf(Products, Category = "Electronics", { Price: Price * 1.1 })`,
        explanation: 'Incrementa el precio de los productos en la categoría "Electronics".'
      }
    ],
    category: 'Modificación de Datos',
    relatedFunctions: ['Patch', 'Update', 'Filter']
  },
  {
    id: 'submitform',
    name: 'SubmitForm',
    syntax: 'SubmitForm( FormName )',
    description: 'Guarda los datos de un control de Formulario en el origen de datos.',
    delegationNotes: 'La delegabilidad depende del origen de datos y de la complejidad del formulario. Las propiedades OnSuccess y OnFailure del formulario se ejecutan después.',
    examples: [
      {
        title: 'Enviar un formulario de edición',
        code: `SubmitForm(EditForm1)`,
        explanation: 'Guarda los cambios realizados en EditForm1.'
      }
    ],
    category: 'Modificación de Datos',
    relatedFunctions: ['Patch', 'ResetForm', 'NewForm', 'EditForm', 'ViewForm']
  },

  // --- Funciones de Manipulación de Tablas y Búsqueda ---
  {
    id: 'filter',
    name: 'Filter',
    syntax: 'Filter( Table, Formula1 [, Formula2, … ] )',
    description: 'Devuelve una tabla que contiene un subconjunto de registros de otra tabla.',
    delegationNotes: 'Delegable para la mayoría de las funciones y operadores en orígenes de datos compatibles.',
    examples: [
      {
        title: 'Filtrar por una condición simple',
        code: `Filter(Products, Stock < 10)`,
        explanation: 'Devuelve todos los productos cuyo stock es menor a 10.'
      },
      {
        title: 'Filtrar por múltiples condiciones (AND implícito)',
        code: `Filter(Products, Price > 50, Category = "Electronics")`,
        explanation: 'Devuelve productos electrónicos con precio mayor a 50.'
      }
    ],
    category: 'Manipulación de Tablas',
    relatedFunctions: ['Search', 'LookUp', 'Sort', 'AddColumns']
  },
  {
    id: 'search',
    name: 'Search',
    syntax: 'Search( Table, SearchString, ColumnName1 [, ColumnName2, ... ] )',
    description: 'Busca una cadena de texto en una o más columnas de una tabla. Devuelve una tabla con los registros que contienen la cadena.',
    delegationNotes: 'Delegable para columnas de texto en muchos orígenes de datos. No distingue mayúsculas/minúsculas.',
    examples: [
      {
        title: 'Buscar "laptop" en las columnas Name y Description',
        code: `Search(Products, "laptop", "Name", "Description")`,
        explanation: 'Devuelve productos que contienen "laptop" en su nombre o descripción.'
      }
    ],
    category: 'Manipulación de Tablas',
    relatedFunctions: ['Filter', 'LookUp', 'StartsWith']
  },
  {
    id: 'lookup',
    name: 'LookUp',
    syntax: 'LookUp( Table, Condition [, ResultFormula ] )',
    description: 'Busca el primer registro en una tabla que satisface una condición. Opcionalmente, puede devolver un valor transformado de ese registro.',
    delegationNotes: 'Delegable en la mayoría de los orígenes de datos para condiciones simples.',
    examples: [
      {
        title: 'Encontrar el precio de un producto específico',
        code: `LookUp(Products, Name = "Laptop Gamer", Price)`,
        explanation: 'Devuelve el precio del producto llamado "Laptop Gamer".'
      }
    ],
    category: 'Búsqueda de Datos',
    relatedFunctions: ['Filter', 'Search', 'First']
  },
  {
    id: 'sortbycolumns',
    name: 'SortByColumns',
    syntax: 'SortByColumns( Table, ColumnName1 [, SortOrder1 [, ColumnName2, SortOrder2, ... ] ] )',
    description: 'Ordena una tabla basándose en una o más columnas.',
    delegationNotes: 'Delegable para la mayoría de los orígenes de datos si se ordena por columnas simples.',
    examples: [
      {
        title: 'Ordenar productos por precio ascendente',
        code: `SortByColumns(Products, "Price", SortOrder.Ascending)`,
        explanation: 'Devuelve la tabla Products ordenada por la columna Price de menor a mayor.'
      }
    ],
    category: 'Manipulación de Tablas',
    relatedFunctions: ['Sort', 'Filter']
  },
  {
    id: 'sort',
    name: 'Sort',
    syntax: 'Sort( Table, Formula [, SortOrder ] )',
    description: 'Ordena una tabla basándose en una fórmula. Menos delegable que SortByColumns.',
    delegationNotes: 'Generalmente no delegable para orígenes de datos grandes. SortByColumns es preferible para la delegación.',
    examples: [
      {
        title: 'Ordenar una colección por la longitud del nombre',
        code: `Sort(colPeople, Len(FullName))`,
        explanation: 'Ordena la colección colPeople por la longitud de la columna FullName.'
      }
    ],
    category: 'Manipulación de Tablas',
    relatedFunctions: ['SortByColumns', 'Filter']
  },
  {
    id: 'addcolumns',
    name: 'AddColumns',
    syntax: 'AddColumns( Table, ColumnName1, Formula1 [, ColumnName2, Formula2, ... ] )',
    description: 'Añade una o más columnas calculadas a una tabla.',
    delegationNotes: 'Delegable si la tabla base y las fórmulas son delegables. La complejidad de la fórmula puede afectar la delegación.',
    examples: [
      {
        title: 'Añadir una columna de precio total (Precio + IVA)',
        code: `AddColumns(Products, "TotalPrice", Price * 1.21)`,
        explanation: 'Añade una columna TotalPrice a la tabla Products, calculada como Price más un 21% de IVA.'
      }
    ],
    category: 'Manipulación de Tablas',
    relatedFunctions: ['DropColumns', 'ShowColumns', 'RenameColumns']
  },
  {
    id: 'showcolumns',
    name: 'ShowColumns',
    syntax: 'ShowColumns( Table, ColumnName1 [, ColumnName2, ... ] )',
    description: 'Devuelve una tabla que contiene solo las columnas especificadas de la tabla original.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Mostrar solo nombre y precio de los productos',
        code: `ShowColumns(Products, "Name", "Price")`,
        explanation: 'Devuelve una tabla con solo las columnas Name y Price de la tabla Products.'
      }
    ],
    category: 'Manipulación de Tablas',
    relatedFunctions: ['AddColumns', 'DropColumns', 'RenameColumns']
  },
  {
    id: 'dropcolumns',
    name: 'DropColumns',
    syntax: 'DropColumns( Table, ColumnName1 [, ColumnName2, ... ] )',
    description: 'Devuelve una tabla con una o más columnas eliminadas.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Eliminar la columna de descripción de productos',
        code: `DropColumns(Products, "Description")`,
        explanation: 'Devuelve la tabla Products sin la columna Description.'
      }
    ],
    category: 'Manipulación de Tablas',
    relatedFunctions: ['AddColumns', 'ShowColumns', 'RenameColumns']
  },
  {
    id: 'renamecolumns',
    name: 'RenameColumns',
    syntax: 'RenameColumns( Table, OldColumnName1, NewColumnName1 [, OldColumnName2, NewColumnName2, ... ] )',
    description: 'Cambia el nombre de una o más columnas en una tabla.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Renombrar "ProductName" a "NombreProducto"',
        code: `RenameColumns(Products, "ProductName", "NombreProducto")`,
        explanation: 'Devuelve la tabla Products con la columna ProductName renombrada.'
      }
    ],
    category: 'Manipulación de Tablas',
    relatedFunctions: ['AddColumns', 'ShowColumns', 'DropColumns']
  },
  {
    id: 'groupby',
    name: 'GroupBy',
    syntax: 'GroupBy( Table, ColumnName1 [, ColumnName2, ... ], GroupColumnName )',
    description: 'Agrupa registros en una tabla basándose en los valores de una o más columnas. Crea una nueva columna que contiene una tabla de los registros agrupados.',
    delegationNotes: 'Generalmente no delegable para orígenes de datos grandes. Opera en memoria después de que los datos son recuperados (hasta el límite de delegación).',
    examples: [
      {
        title: 'Agrupar productos por categoría y contar cuántos hay en cada una',
        code: `AddColumns(GroupBy(Products, "Category", "ByCategory"), "Count", CountRows(ByCategory))`,
        explanation: 'Agrupa los productos por "Category" y luego añade una columna "Count" con el número de productos en cada categoría.'
      }
    ],
    category: 'Manipulación de Tablas',
    relatedFunctions: ['Ungroup', 'AddColumns', 'Filter']
  },
  {
    id: 'ungroup',
    name: 'Ungroup',
    syntax: 'Ungroup( Table, GroupColumnName )',
    description: 'Invierte una operación de GroupBy, expandiendo los registros agrupados.',
    delegationNotes: 'No aplicable directamente a orígenes de datos; opera sobre tablas ya agrupadas en memoria.',
    examples: [
      {
        title: 'Expandir una tabla agrupada',
        code: `// Asumiendo que 'GroupedProducts' es el resultado de un GroupBy(Products, "Category", "ByCategory")
Ungroup(GroupedProducts, "ByCategory")`,
        explanation: 'Devuelve una tabla similar a la original "Products" antes de ser agrupada.'
      }
    ],
    category: 'Manipulación de Tablas',
    relatedFunctions: ['GroupBy']
  },
  {
    id: 'forall',
    name: 'ForAll',
    syntax: 'ForAll( Table, Formula )',
    description: 'Evalúa una fórmula para cada registro de una tabla. Puede usarse para realizar cálculos, modificar datos (con Patch dentro de ForAll), o crear una nueva tabla de resultados.',
    delegationNotes: 'No delegable si la fórmula interna no es delegable o si modifica datos. La iteración ocurre localmente.',
    examples: [
      {
        title: 'Crear una colección con precios actualizados',
        code: `ClearCollect(colUpdatedPrices, ForAll(Products, { Name: Name, NewPrice: Price * 1.05 }))`,
        explanation: 'Crea una nueva colección colUpdatedPrices con los nombres de los productos y sus precios incrementados en un 5%.'
      },
      {
        title: 'Enviar múltiples notificaciones',
        code: `ForAll(Filter(Users, Department = "Sales"), Notify("Recordatorio de reunión para " & FullName, NotificationType.Information))`
      }
    ],
    category: 'Manipulación de Tablas',
    relatedFunctions: ['Filter', 'Patch', 'Collect', 'Sequence']
  },

  // --- Funciones de Búsqueda de Datos (Single Record) ---
  {
    id: 'first',
    name: 'First',
    syntax: 'First( Table )',
    description: 'Devuelve el primer registro de una tabla.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Obtener el primer producto de una lista ordenada',
        code: `First(SortByColumns(Products, "Name"))`,
        explanation: 'Devuelve el primer producto después de ordenar la tabla Products por nombre.'
      }
    ],
    category: 'Búsqueda de Datos',
    relatedFunctions: ['Last', 'FirstN', 'LookUp']
  },
  {
    id: 'last',
    name: 'Last',
    syntax: 'Last( Table )',
    description: 'Devuelve el último registro de una tabla.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Obtener el último pedido realizado',
        code: `Last(SortByColumns(Orders, "OrderDate", SortOrder.Descending))`,
        explanation: 'Devuelve el pedido más reciente.'
      }
    ],
    category: 'Búsqueda de Datos',
    relatedFunctions: ['First', 'LastN']
  },

  // --- Funciones de Manipulación de Tablas (Múltiples Registros) ---
  {
    id: 'firstn',
    name: 'FirstN',
    syntax: 'FirstN( Table, NumberOfRecords )',
    description: 'Devuelve una tabla con los primeros N registros de otra tabla.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Obtener los 5 productos más caros',
        code: `FirstN(SortByColumns(Products, "Price", SortOrder.Descending), 5)`,
        explanation: 'Devuelve una tabla con los 5 productos con el precio más alto.'
      }
    ],
    category: 'Manipulación de Tablas',
    relatedFunctions: ['LastN', 'First', 'Last']
  },
  {
    id: 'lastn',
    name: 'LastN',
    syntax: 'LastN( Table, NumberOfRecords )',
    description: 'Devuelve una tabla con los últimos N registros de otra tabla.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Obtener los 3 últimos comentarios',
        code: `LastN(SortByColumns(Comments, "CommentDate", SortOrder.Ascending), 3)`,
        explanation: 'Devuelve una tabla con los 3 comentarios más recientes.'
      }
    ],
    category: 'Manipulación de Tablas',
    relatedFunctions: ['FirstN', 'First', 'Last']
  },

  // --- Funciones de Agregación ---
  {
    id: 'countrows',
    name: 'CountRows',
    syntax: 'CountRows( TableOrFilterResult )',
    description: 'Cuenta el número de registros en una tabla o el resultado de una función de filtrado.',
    delegationNotes: 'Delegable para la mayoría de los orígenes de datos.',
    examples: [
      {
        title: 'Contar todos los productos en stock',
        code: `CountRows(Filter(Products, InStock = true))`,
        explanation: 'Devuelve el número de productos que están en stock.'
      }
    ],
    category: 'Agregación',
    relatedFunctions: ['Count', 'CountA', 'CountIf']
  },
  {
    id: 'sum',
    name: 'Sum',
    syntax: 'Sum( Table, NumericFormula )',
    description: 'Calcula la suma de una fórmula numérica para todos los registros de una tabla.',
    delegationNotes: 'Delegable para columnas numéricas en la mayoría de los orígenes de datos.',
    examples: [
      {
        title: 'Calcular el valor total del inventario',
        code: `Sum(Products, Price * Stock)`,
        explanation: 'Devuelve la suma de (Precio * Stock) para todos los productos.'
      }
    ],
    category: 'Agregación',
    relatedFunctions: ['Average', 'Min', 'Max', 'StdevP']
  },
  {
    id: 'average',
    name: 'Average',
    syntax: 'Average( Table, NumericFormula )',
    description: 'Calcula el promedio de una fórmula numérica para todos los registros de una tabla.',
    delegationNotes: 'Delegable para columnas numéricas.',
    examples: [
      {
        title: 'Calcular el precio promedio de los productos',
        code: `Average(Products, Price)`,
        explanation: 'Devuelve el precio promedio de todos los productos.'
      }
    ],
    category: 'Agregación',
    relatedFunctions: ['Sum', 'Min', 'Max', 'Median']
  },
  {
    id: 'min',
    name: 'Min',
    syntax: 'Min( Table, NumericFormulaOrColumn ) // O Min( Number1, Number2 [, ...] )',
    description: 'Devuelve el valor mínimo de una fórmula numérica en una tabla, o el mínimo de un conjunto de números.',
    delegationNotes: 'Delegable para columnas numéricas.',
    examples: [
      {
        title: 'Encontrar el precio más bajo de un producto',
        code: `Min(Products, Price)`,
        explanation: 'Devuelve el precio del producto más barato.'
      }
    ],
    category: 'Agregación',
    relatedFunctions: ['Max', 'Sum', 'Average']
  },
  {
    id: 'max',
    name: 'Max',
    syntax: 'Max( Table, NumericFormulaOrColumn ) // O Max( Number1, Number2 [, ...] )',
    description: 'Devuelve el valor máximo de una fórmula numérica en una tabla, o el máximo de un conjunto de números.',
    delegationNotes: 'Delegable para columnas numéricas.',
    examples: [
      {
        title: 'Encontrar la fecha de pedido más reciente',
        code: `Max(Orders, OrderDate)`,
        explanation: 'Devuelve la fecha del pedido más reciente.'
      }
    ],
    category: 'Agregación',
    relatedFunctions: ['Min', 'Sum', 'Average']
  },
  {
    id: 'stdevp',
    name: 'StdevP',
    syntax: 'StdevP( Table, NumericFormula )',
    description: 'Calcula la desviación estándar de una población basándose en una fórmula numérica para todos los registros de una tabla.',
    delegationNotes: 'Delegable para columnas numéricas.',
    examples: [
      {
        title: 'Calcular la desviación estándar de las puntuaciones de los exámenes',
        code: `StdevP(ExamScores, Score)`,
        explanation: 'Devuelve la desviación estándar de todas las puntuaciones.'
      }
    ],
    category: 'Agregación',
    relatedFunctions: ['VarP', 'Average', 'Sum']
  },
  {
    id: 'varp',
    name: 'VarP',
    syntax: 'VarP( Table, NumericFormula )',
    description: 'Calcula la varianza de una población basándose en una fórmula numérica para todos los registros de una tabla.',
    delegationNotes: 'Delegable para columnas numéricas.',
    examples: [
      {
        title: 'Calcular la varianza de las alturas de los estudiantes',
        code: `VarP(StudentData, HeightInCm)`,
        explanation: 'Devuelve la varianza de las alturas.'
      }
    ],
    category: 'Agregación',
    relatedFunctions: ['StdevP', 'Average', 'Sum']
  },

  // --- Funciones Lógicas ---
  {
    id: 'if',
    name: 'If',
    syntax: 'If( Condition, ThenResult [, ElseResultOrCondition2, ThenResult2 ... [, DefaultResult ] ] )',
    description: 'Evalúa una condición y devuelve un valor si es verdadera, y otro valor si es falsa. Puede anidarse o tener múltiples ramas.',
    delegationNotes: 'Delegable si las condiciones y los resultados son delegables.',
    examples: [
      {
        title: 'Determinar el estado de un pedido',
        code: `If(ThisItem.Status = "Shipped", "Enviado", ThisItem.Status = "Pending", "Pendiente", "Desconocido")`,
        explanation: 'Devuelve "Enviado", "Pendiente" o "Desconocido" basado en el valor de ThisItem.Status.'
      }
    ],
    category: 'Lógica',
    relatedFunctions: ['Switch', 'And', 'Or', 'Not']
  },
  {
    id: 'switch',
    name: 'Switch',
    syntax: 'Switch( Formula, MatchValue1, Result1 [, MatchValue2, Result2, ... [, DefaultResult ] ] )',
    description: 'Compara una fórmula con una serie de valores. Devuelve el resultado correspondiente al primer valor coincidente.',
    delegationNotes: 'Delegable si la fórmula a evaluar y los resultados son delegables.',
    examples: [
      {
        title: 'Asignar un nivel de prioridad basado en texto',
        code: `Switch(DropdownPriority.Selected.Value, "Alta", 1, "Media", 2, "Baja", 3, 0)`,
        explanation: 'Devuelve 1, 2, o 3 según la selección en DropdownPriority, o 0 si no hay coincidencia.'
      }
    ],
    category: 'Lógica',
    relatedFunctions: ['If']
  },
  {
    id: 'and',
    name: 'And',
    syntax: 'And( Condition1, Condition2 [, ... ] )  // También se puede usar &&',
    description: 'Devuelve verdadero si todas las condiciones son verdaderas.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Verificar si un producto está en stock Y es caro',
        code: `And(Product.InStock, Product.Price > 1000)\n// Alternativa: Product.InStock && Product.Price > 1000`,
        explanation: 'Devuelve true si ambas condiciones se cumplen.'
      }
    ],
    category: 'Lógica',
    relatedFunctions: ['Or', 'Not', 'If']
  },
  {
    id: 'or',
    name: 'Or',
    syntax: 'Or( Condition1, Condition2 [, ... ] ) // También se puede usar ||',
    description: 'Devuelve verdadero si al menos una de las condiciones es verdadera.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Verificar si un pedido es urgente O de alto valor',
        code: `Or(Order.IsUrgent, Order.TotalAmount > 500)\n// Alternativa: Order.IsUrgent || Order.TotalAmount > 500`,
        explanation: 'Devuelve true si alguna de las condiciones se cumple.'
      }
    ],
    category: 'Lógica',
    relatedFunctions: ['And', 'Not', 'If']
  },
  {
    id: 'not',
    name: 'Not',
    syntax: 'Not( Condition ) // También se puede usar !',
    description: 'Invierte el valor de una condición booleana.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Verificar si un producto NO está descatalogado',
        code: `Not(Product.IsDiscontinued)\n// Alternativa: !Product.IsDiscontinued`,
        explanation: 'Devuelve true si el producto no está descatalogado.'
      }
    ],
    category: 'Lógica',
    relatedFunctions: ['And', 'Or', 'If']
  },
  {
    id: 'isblank',
    name: 'IsBlank',
    syntax: 'IsBlank( Value )',
    description: 'Comprueba si un valor está en blanco (blank). Un valor en blanco es un marcador de posición para "sin valor" o "valor desconocido".',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Verificar si un campo de texto está vacío',
        code: `If(IsBlank(TextInput1.Text), Notify("El campo es obligatorio"), SubmitForm(Form1))`,
        explanation: 'Muestra una notificación si el campo está vacío, de lo contrario envía el formulario.'
      }
    ],
    category: 'Lógica',
    relatedFunctions: ['IsEmpty', 'Coalesce', 'IsBlankOrError']
  },
  {
    id: 'isblankorerror',
    name: 'IsBlankOrError',
    syntax: 'IsBlankOrError( Value )',
    description: 'Comprueba si un valor está en blanco (blank) o contiene un error.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Manejar posible error en una división',
        code: `If(IsBlankOrError(ValueA / ValueB), 0, ValueA / ValueB)`,
        explanation: 'Devuelve 0 si la división resulta en error (ej. división por cero) o si alguno de los valores es blank, de lo contrario devuelve el resultado de la división.'
      }
    ],
    category: 'Lógica y Errores',
    relatedFunctions: ['IsBlank', 'IsEmpty', 'IfError']
  },
  {
    id: 'isempty',
    name: 'IsEmpty',
    syntax: 'IsEmpty( Table )',
    description: 'Comprueba si una tabla no contiene registros.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Mostrar un mensaje si una galería no tiene ítems',
        code: `If(IsEmpty(Gallery1.AllItems), "No hay ítems para mostrar", "")`,
        explanation: 'Controla la visibilidad de un mensaje basado en si la galería está vacía.'
      }
    ],
    category: 'Lógica',
    relatedFunctions: ['IsBlank', 'CountRows']
  },
  {
    id: 'coalesce',
    name: 'Coalesce',
    syntax: 'Coalesce( Value1 [, Value2, ... ] )',
    description: 'Devuelve el primer argumento que no está en blanco (blank) ni es una cadena vacía ("").',
    delegationNotes: 'Delegable si los argumentos son delegables.',
    examples: [
      {
        title: 'Mostrar un valor por defecto si un campo está vacío',
        code: `Coalesce(Profile.PhoneNumber, "N/A")`,
        explanation: 'Muestra el número de teléfono del perfil, o "N/A" si está en blanco.'
      }
    ],
    category: 'Lógica',
    relatedFunctions: ['IsBlank', 'If']
  },
  {
    id: 'iferror',
    name: 'IfError',
    syntax: 'IfError( Value1, Replacement1 [, Value2, Replacement2, ... [, DefaultResult ] ] )',
    description: 'Detecta errores y proporciona un valor alternativo o ejecuta una acción. Si no se detectan errores, se evalúa el valor original.',
    delegationNotes: 'La delegabilidad depende de los argumentos.',
    examples: [
      {
        title: 'Manejar un posible error de división por cero',
        code: `IfError(Value(TextInput1.Text) / Value(TextInput2.Text), Notify("Error: División por cero o entrada no válida.", NotificationType.Error); 0)`,
        explanation: 'Realiza la división. Si hay un error, notifica al usuario y devuelve 0.'
      }
    ],
    category: 'Lógica y Errores',
    relatedFunctions: ['IsError', 'IsBlankOrError']
  },
  {
    id: 'iserror',
    name: 'IsError',
    syntax: 'IsError( Value )',
    description: 'Comprueba si un valor es un error.',
    delegationNotes: 'No aplicable directamente a delegación de datos, se usa para evaluar resultados de fórmulas.',
    examples: [
      {
        title: 'Verificar si una operación de Patch falló',
        code: `Set(gblPatchResult, Patch(MyDataSource, Defaults(MyDataSource), {Title: "Test"}));
If(IsError(gblPatchResult), Notify("Falló el Patch: " & First(gblPatchResult.Errors).Message))`,
        explanation: 'Intenta un Patch y notifica si el resultado es un error.'
      }
    ],
    category: 'Lógica y Errores',
    relatedFunctions: ['IfError', 'Errors']
  },

  // --- Funciones de Texto ---
  {
    id: 'text',
    name: 'Text',
    syntax: 'Text( Value [, DateTimeFormatEnumOrString [, LanguageTag ] ] )',
    description: 'Convierte un valor (número, fecha, hora, booleano) a una cadena de texto con un formato específico.',
    delegationNotes: 'Generalmente delegable.',
    examples: [
      {
        title: 'Formatear un número como moneda',
        code: `Text(1234.56, "[$-en-US]$#,##0.00")`,
        explanation: 'Devuelve "$1,234.56".'
      },
      {
        title: 'Formatear una fecha en formato largo',
        code: `Text(Today(), DateTimeFormat.LongDate)`,
        explanation: 'Devuelve la fecha actual en formato largo.'
      }
    ],
    category: 'Texto',
    relatedFunctions: ['Value', 'DateValue', 'TimeValue', 'Concatenate']
  },
  {
    id: 'concatenate',
    name: 'Concatenate',
    syntax: 'Concatenate( String1 [, String2, ... ] ) // También se puede usar &',
    description: 'Une dos o más cadenas de texto.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Crear un saludo personalizado',
        code: `Concatenate("Hola, ", User().FullName, "!")\n// Alternativa: "Hola, " & User().FullName & "!"`,
        explanation: 'Combina cadenas para formar un saludo.'
      }
    ],
    category: 'Texto',
    relatedFunctions: ['Text', 'Left', 'Right', 'Mid', 'Concat']
  },
  {
    id: 'concat',
    name: 'Concat',
    syntax: 'Concat( Table, Formula [, Separator ] )',
    description: 'Concatena el resultado de una fórmula evaluada para cada registro de una tabla, opcionalmente con un separador.',
    delegationNotes: 'No delegable. Opera sobre la tabla en memoria (hasta el límite de delegación si la tabla es un origen de datos).',
    examples: [
      {
        title: 'Crear una lista de emails separados por punto y coma',
        code: `Concat(Filter(Contacts, Department="Sales"), Email & "; ")`,
        explanation: 'Devuelve una cadena con los emails de los contactos de ventas, separados por ";".'
      }
    ],
    category: 'Texto',
    relatedFunctions: ['Concatenate', 'Split', 'ForAll']
  },
  {
    id: 'len',
    name: 'Len',
    syntax: 'Len( String )',
    description: 'Devuelve el número de caracteres en una cadena de texto.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Contar caracteres en un campo de texto',
        code: `Len(TextInputReview.Text)`,
        explanation: 'Devuelve la longitud del texto ingresado.'
      }
    ],
    category: 'Texto',
    relatedFunctions: ['Left', 'Right', 'Mid']
  },
  {
    id: 'left',
    name: 'Left',
    syntax: 'Left( String, NumberOfCharacters )',
    description: 'Devuelve los primeros N caracteres de una cadena de texto.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Obtener los primeros 3 caracteres de un código postal',
        code: `Left("90210-1234", 5)`,
        explanation: 'Devuelve "90210".'
      }
    ],
    category: 'Texto',
    relatedFunctions: ['Right', 'Mid', 'Len']
  },
  {
    id: 'right',
    name: 'Right',
    syntax: 'Right( String, NumberOfCharacters )',
    description: 'Devuelve los últimos N caracteres de una cadena de texto.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Obtener la extensión de un nombre de archivo',
        code: `Right("document.pdf", 3)`,
        explanation: 'Devuelve "pdf". (Nota: para una solución robusta, considera Split o Match).'
      }
    ],
    category: 'Texto',
    relatedFunctions: ['Left', 'Mid', 'Len']
  },
  {
    id: 'mid',
    name: 'Mid',
    syntax: 'Mid( String, StartingPosition, NumberOfCharacters )',
    description: 'Extrae una subcadena de una cadena de texto, comenzando en una posición específica.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Extraer el mes de una fecha en formato YYYYMMDD',
        code: `Mid("20250526", 5, 2)`,
        explanation: 'Devuelve "05".'
      }
    ],
    category: 'Texto',
    relatedFunctions: ['Left', 'Right', 'Len']
  },
  {
    id: 'lower',
    name: 'Lower',
    syntax: 'Lower( String )',
    description: 'Convierte todas las letras de una cadena de texto a minúsculas.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Convertir un email a minúsculas para comparación',
        code: `Lower(TextInputEmail.Text) = Lower(LookUp(Users, UserID = 1).Email)`,
        explanation: 'Compara emails ignorando mayúsculas/minúsculas.'
      }
    ],
    category: 'Texto',
    relatedFunctions: ['Upper', 'Proper']
  },
  {
    id: 'upper',
    name: 'Upper',
    syntax: 'Upper( String )',
    description: 'Convierte todas las letras de una cadena de texto a mayúsculas.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Mostrar un código de producto en mayúsculas',
        code: `Upper(Product.ProductCode)`,
        explanation: 'Asegura que el código se muestre en mayúsculas.'
      }
    ],
    category: 'Texto',
    relatedFunctions: ['Lower', 'Proper']
  },
  {
    id: 'proper',
    name: 'Proper',
    syntax: 'Proper( String )',
    description: 'Convierte la primera letra de cada palabra en una cadena de texto a mayúscula y el resto a minúsculas.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Formatear un nombre propio',
        code: `Proper("john doe")`,
        explanation: 'Devuelve "John Doe".'
      }
    ],
    category: 'Texto',
    relatedFunctions: ['Lower', 'Upper']
  },
  {
    id: 'trim',
    name: 'Trim',
    syntax: 'Trim( String )',
    description: 'Elimina los espacios iniciales y finales de una cadena de texto.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Limpiar la entrada de un campo de texto',
        code: `Trim(TextInputSearch.Text)`,
        explanation: 'Elimina espacios extra antes de usar el valor para buscar.'
      }
    ],
    category: 'Texto',
    relatedFunctions: ['TrimEnds']
  },
  {
    id: 'replace',
    name: 'Replace',
    syntax: 'Replace( OldText, StartingPosition, NumberOfCharacters, NewText )',
    description: 'Reemplaza una parte de una cadena de texto con otra cadena, basándose en la posición inicial y el número de caracteres.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Reemplazar un código de área',
        code: `Replace("(123) 456-7890", 2, 3, "555")`,
        explanation: 'Devuelve "(555) 456-7890".'
      }
    ],
    category: 'Texto',
    relatedFunctions: ['Substitute']
  },
  {
    id: 'substitute',
    name: 'Substitute',
    syntax: 'Substitute( Text, OldText, NewText [, InstanceNumber ] )',
    description: 'Reemplaza todas las ocurrencias de una subcadena por otra subcadena en una cadena de texto. Opcionalmente, reemplaza solo una instancia específica.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Reemplazar espacios por guiones bajos',
        code: `Substitute("Informe Anual Ventas", " ", "_")`,
        explanation: 'Devuelve "Informe_Anual_Ventas".'
      }
    ],
    category: 'Texto',
    relatedFunctions: ['Replace']
  },
  {
    id: 'split',
    name: 'Split',
    syntax: 'Split( Text, Separator )',
    description: 'Divide una cadena de texto en una tabla de subcadenas, usando un separador.',
    delegationNotes: 'No delegable. Opera en memoria.',
    examples: [
      {
        title: 'Obtener una lista de etiquetas de una cadena separada por comas',
        code: `Split("powerapps,powerautomate,powerbi", ",")`,
        explanation: 'Devuelve una tabla de una sola columna "Result" con tres filas: "powerapps", "powerautomate", "powerbi".'
      }
    ],
    category: 'Texto',
    relatedFunctions: ['Concat', 'Concatenate']
  },
  {
    id: 'ismatch',
    name: 'IsMatch',
    syntax: 'IsMatch( Text, Pattern [, Options ] )',
    description: 'Comprueba si una cadena de texto coincide con un patrón (expresión regular) o uno de los patrones predefinidos (Match.Email, Match.MultipleDigits, etc.).',
    delegationNotes: 'La delegabilidad puede depender del patrón y del origen de datos.',
    examples: [
      {
        title: 'Validar un formato de código postal (5 dígitos)',
        code: `IsMatch(TextInputZip.Text, Match.MultipleDigits & Match.Exact & Match.Length(5))`,
        explanation: 'Devuelve true si el texto son exactamente 5 dígitos.'
      }
    ],
    category: 'Texto',
    relatedFunctions: ['Match', 'MatchAll']
  },
  {
    id: 'char',
    name: 'Char',
    syntax: 'Char( CharacterCode )',
    description: 'Devuelve una cadena que contiene el carácter correspondiente a un código de carácter Unicode.',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Insertar un salto de línea',
        code: `Concatenate("Línea 1", Char(10), "Línea 2")`,
        explanation: 'Char(10) es un salto de línea. Char(13) es un retorno de carro.'
      }
    ],
    category: 'Texto',
    relatedFunctions: ['UniChar', 'Asc']
  },

  // --- Funciones de Fechas y Horas ---
  {
    id: 'today',
    name: 'Today',
    syntax: 'Today()',
    description: 'Devuelve la fecha actual.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Mostrar la fecha actual',
        code: `Today()`,
        explanation: 'Se puede usar en una etiqueta o para filtrar datos.'
      }
    ],
    category: 'Fechas y Horas',
    relatedFunctions: ['Now', 'DateValue']
  },
  {
    id: 'now',
    name: 'Now',
    syntax: 'Now()',
    description: 'Devuelve la fecha y hora actuales.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Registrar la marca de tiempo de una acción',
        code: `Patch(AuditLog, Defaults(AuditLog), {Action: "Login", Timestamp: Now()})`,
        explanation: 'Guarda la fecha y hora exactas del login.'
      }
    ],
    category: 'Fechas y Horas',
    relatedFunctions: ['Today', 'TimeValue']
  },
  {
    id: 'date',
    name: 'Date',
    syntax: 'Date( Year, Month, Day )',
    description: 'Crea un valor de fecha a partir de los componentes de año, mes y día.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Crear una fecha específica',
        code: `Date(2025, 12, 25)`,
        explanation: 'Devuelve el 25 de diciembre de 2025.'
      }
    ],
    category: 'Fechas y Horas',
    relatedFunctions: ['DateValue', 'Year', 'Month', 'Day']
  },
  {
    id: 'datevalue',
    name: 'DateValue',
    syntax: 'DateValue( DateTimeString [, LanguageTag ] )',
    description: 'Convierte una cadena de texto que representa una fecha a un valor de fecha.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Convertir una cadena de texto a fecha',
        code: `DateValue("25/12/2025", "es-ES")`,
        explanation: 'Interpreta la cadena como una fecha en formato español.'
      }
    ],
    category: 'Fechas y Horas',
    relatedFunctions: ['TimeValue', 'DateTimeValue', 'Text']
  },
  {
    id: 'timevalue',
    name: 'TimeValue',
    syntax: 'TimeValue( DateTimeString [, LanguageTag ] )',
    description: 'Convierte una cadena de texto que representa una hora a un valor de hora.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Convertir una cadena de texto a hora',
        code: `TimeValue("14:30:00")`,
        explanation: 'Devuelve las 2:30 PM.'
      }
    ],
    category: 'Fechas y Horas',
    relatedFunctions: ['DateValue', 'DateTimeValue', 'Text']
  },
  {
    id: 'datetimevalue',
    name: 'DateTimeValue',
    syntax: 'DateTimeValue( DateTimeString [, LanguageTag ] )',
    description: 'Convierte una cadena de texto que representa una fecha y hora a un valor de fecha y hora.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Convertir una cadena de texto a fecha y hora',
        code: `DateTimeValue("25/12/2025 14:30", "es-ES")`,
        explanation: 'Interpreta la cadena como fecha y hora.'
      }
    ],
    category: 'Fechas y Horas',
    relatedFunctions: ['DateValue', 'TimeValue', 'Text']
  },
  {
    id: 'year',
    name: 'Year',
    syntax: 'Year( DateTimeValue )',
    description: 'Devuelve el componente de año de un valor de fecha/hora.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Obtener el año de una fecha',
        code: `Year(Today())`,
        explanation: 'Devuelve el año actual.'
      }
    ],
    category: 'Fechas y Horas',
    relatedFunctions: ['Month', 'Day', 'Date']
  },
  {
    id: 'month',
    name: 'Month',
    syntax: 'Month( DateTimeValue )',
    description: 'Devuelve el componente de mes (1-12) de un valor de fecha/hora.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Obtener el mes de una fecha',
        code: `Month(DatePicker1.SelectedDate)`,
        explanation: 'Devuelve el número del mes seleccionado en un DatePicker.'
      }
    ],
    category: 'Fechas y Horas',
    relatedFunctions: ['Year', 'Day', 'Date']
  },
  {
    id: 'day',
    name: 'Day',
    syntax: 'Day( DateTimeValue )',
    description: 'Devuelve el componente de día (1-31) de un valor de fecha/hora.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Obtener el día de una fecha',
        code: `Day(Now())`,
        explanation: 'Devuelve el día actual del mes.'
      }
    ],
    category: 'Fechas y Horas',
    relatedFunctions: ['Year', 'Month', 'Date', 'Weekday']
  },
  {
    id: 'weekday',
    name: 'Weekday',
    syntax: 'Weekday( DateTimeValue [, StartOfWeekEnum ] )',
    description: 'Devuelve el día de la semana (1-7) para un valor de fecha/hora. El primer día de la semana puede especificarse.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Obtener el día de la semana (Domingo=1)',
        code: `Weekday(Today()) // Por defecto, Domingo es 1`,
        explanation: 'Devuelve un número representando el día de la semana.'
      },
      {
        title: 'Obtener el día de la semana (Lunes=1)',
        code: `Weekday(Today(), StartOfWeek.Monday)`,
        explanation: 'Devuelve un número donde Lunes es 1.'
      }
    ],
    category: 'Fechas y Horas',
    relatedFunctions: ['Day', 'Date']
  },
  {
    id: 'hour',
    name: 'Hour',
    syntax: 'Hour( DateTimeValue )',
    description: 'Devuelve el componente de hora (0-23) de un valor de fecha/hora.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Obtener la hora actual',
        code: `Hour(Now())`,
        explanation: 'Devuelve la hora actual del día (0-23).'
      }
    ],
    category: 'Fechas y Horas',
    relatedFunctions: ['Minute', 'Second', 'Time']
  },
  {
    id: 'minute',
    name: 'Minute',
    syntax: 'Minute( DateTimeValue )',
    description: 'Devuelve el componente de minuto (0-59) de un valor de fecha/hora.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Obtener el minuto actual',
        code: `Minute(Now())`,
        explanation: 'Devuelve el minuto actual de la hora.'
      }
    ],
    category: 'Fechas y Horas',
    relatedFunctions: ['Hour', 'Second', 'Time']
  },
  {
    id: 'second',
    name: 'Second',
    syntax: 'Second( DateTimeValue )',
    description: 'Devuelve el componente de segundo (0-59) de un valor de fecha/hora.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Obtener el segundo actual',
        code: `Second(Now())`,
        explanation: 'Devuelve el segundo actual del minuto.'
      }
    ],
    category: 'Fechas y Horas',
    relatedFunctions: ['Hour', 'Minute', 'Time']
  },
  {
    id: 'dateadd',
    name: 'DateAdd',
    syntax: 'DateAdd( DateTimeValue, NumberToAdd [, UnitsEnum ] )',
    description: 'Añade un número de unidades (días, meses, años, etc.) a un valor de fecha/hora.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Calcular la fecha de vencimiento en 30 días',
        code: `DateAdd(Today(), 30, Days)`,
        explanation: 'Devuelve la fecha 30 días a partir de hoy.'
      },
      {
        title: 'Calcular la fecha del próximo mes',
        code: `DateAdd(Today(), 1, Months)`,
        explanation: 'Devuelve la misma fecha del próximo mes.'
      }
    ],
    category: 'Fechas y Horas',
    relatedFunctions: ['DateDiff']
  },
  {
    id: 'datediff',
    name: 'DateDiff',
    syntax: 'DateDiff( StartDateTime, EndDateTime [, UnitsEnum ] )',
    description: 'Calcula la diferencia entre dos valores de fecha/hora en las unidades especificadas (días, meses, años, etc.).',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Calcular el número de días entre dos fechas',
        code: `DateDiff(DatePickerStart.SelectedDate, DatePickerEnd.SelectedDate, Days)`,
        explanation: 'Devuelve la diferencia en días.'
      },
      {
        title: 'Calcular la edad de una persona en años',
        code: `DateDiff(BirthdayPicker.SelectedDate, Today(), Years)`,
        explanation: 'Devuelve la edad en años.'
      }
    ],
    category: 'Fechas y Horas',
    relatedFunctions: ['DateAdd']
  },
  {
    id: 'calendar',
    name: 'Calendar',
    syntax: 'Calendar.MonthsLong() / Calendar.MonthsShort() / Calendar.WeekdaysLong() / Calendar.WeekdaysShort()',
    description: 'Proporciona tablas de nombres de meses y días de la semana en el idioma del usuario actual.',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Obtener una lista de los nombres largos de los meses',
        code: `Calendar.MonthsLong()`,
        explanation: 'Devuelve una tabla de una columna con los nombres de los meses (Enero, Febrero, etc.).'
      },
      {
        title: 'Usar para un desplegable de días de la semana',
        code: `// En la propiedad Items de un Dropdown:
Calendar.WeekdaysShort()`,
        explanation: 'Puebla un desplegable con los nombres cortos de los días de la semana (Lun, Mar, etc.).'
      }
    ],
    category: 'Fechas y Horas',
    relatedFunctions: ['Language']
  },

  // --- Funciones Matemáticas ---
  {
    id: 'value',
    name: 'Value',
    syntax: 'Value( String [, LanguageTag ] )',
    description: 'Convierte una cadena de texto que representa un número a un valor numérico.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Convertir la entrada de un texto a número para cálculos',
        code: `Value(TextInputQuantity.Text) * Value(TextInputPrice.Text)`,
        explanation: 'Multiplica la cantidad y el precio ingresados como texto.'
      }
    ],
    category: 'Matemáticas',
    relatedFunctions: ['Text', 'Round']
  },
  {
    id: 'round',
    name: 'Round',
    syntax: 'Round( Number, NumberOfDigits )',
    description: 'Redondea un número al número especificado de decimales.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Redondear un precio a 2 decimales',
        code: `Round(3.14159, 2)`,
        explanation: 'Devuelve 3.14.'
      }
    ],
    category: 'Matemáticas',
    relatedFunctions: ['RoundUp', 'RoundDown', 'Int', 'Trunc']
  },
  {
    id: 'roundup',
    name: 'RoundUp',
    syntax: 'RoundUp( Number, NumberOfDigits )',
    description: 'Redondea un número hacia arriba (alejándose de cero) al número especificado de decimales.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Redondear hacia arriba un cálculo',
        code: `RoundUp(76.8, 0)`,
        explanation: 'Devuelve 77.'
      }
    ],
    category: 'Matemáticas',
    relatedFunctions: ['Round', 'RoundDown']
  },
  {
    id: 'rounddown',
    name: 'RoundDown',
    syntax: 'RoundDown( Number, NumberOfDigits )',
    description: 'Redondea un número hacia abajo (hacia cero) al número especificado de decimales.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Redondear hacia abajo un cálculo',
        code: `RoundDown(76.8, 0)`,
        explanation: 'Devuelve 76.'
      }
    ],
    category: 'Matemáticas',
    relatedFunctions: ['Round', 'RoundUp', 'Trunc']
  },
  {
    id: 'int',
    name: 'Int',
    syntax: 'Int( Number )',
    description: 'Redondea un número al entero inferior más cercano.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Obtener la parte entera de un número',
        code: `Int(3.9)`,
        explanation: 'Devuelve 3.'
      }
    ],
    category: 'Matemáticas',
    relatedFunctions: ['Round', 'Trunc']
  },
  {
    id: 'trunc',
    name: 'Trunc',
    syntax: 'Trunc( Number [, NumberOfDigits ] )',
    description: 'Elimina la parte decimal de un número sin redondear, opcionalmente hasta un número específico de decimales.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Obtener la parte entera de un número (similar a Int para positivos)',
        code: `Trunc(3.999)`,
        explanation: 'Devuelve 3.'
      },
      {
        title: 'Truncar a 2 decimales',
        code: `Trunc(3.14159, 2)`,
        explanation: 'Devuelve 3.14.'
      }
    ],
    category: 'Matemáticas',
    relatedFunctions: ['Int', 'Round', 'RoundDown']
  },
  {
    id: 'mod',
    name: 'Mod',
    syntax: 'Mod( Number, Divisor )',
    description: 'Devuelve el residuo después de dividir un número por un divisor.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Verificar si un número es par',
        code: `If(Mod(Value(TextInput1.Text), 2) = 0, "Par", "Impar")`,
        explanation: 'Devuelve "Par" o "Impar".'
      }
    ],
    category: 'Matemáticas',
    relatedFunctions: ['Round', 'Int']
  },
  {
    id: 'abs',
    name: 'Abs',
    syntax: 'Abs( Number )',
    description: 'Devuelve el valor absoluto de un número.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Obtener la diferencia absoluta',
        code: `Abs(ValorA - ValorB)`,
        explanation: 'Devuelve la diferencia positiva entre ValorA y ValorB.'
      }
    ],
    category: 'Matemáticas',
    relatedFunctions: ['Sign']
  },
  {
    id: 'sqrt',
    name: 'Sqrt',
    syntax: 'Sqrt( Number )',
    description: 'Devuelve la raíz cuadrada de un número.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Calcular la raíz cuadrada',
        code: `Sqrt(25)`,
        explanation: 'Devuelve 5.'
      }
    ],
    category: 'Matemáticas',
    relatedFunctions: ['Power', 'Exp', 'Ln']
  },
  {
    id: 'power',
    name: 'Power',
    syntax: 'Power( Base, Exponent ) // También se puede usar ^',
    description: 'Eleva un número a una potencia.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Calcular 2 elevado a la 3ra potencia',
        code: `Power(2, 3)\n// Alternativa: 2^3`,
        explanation: 'Devuelve 8.'
      }
    ],
    category: 'Matemáticas',
    relatedFunctions: ['Sqrt', 'Exp']
  },
  {
    id: 'exp',
    name: 'Exp',
    syntax: 'Exp( Number )',
    description: 'Devuelve e (constante de Euler) elevado a la potencia de un número.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Calcular e^2',
        code: `Exp(2)`,
        explanation: 'Devuelve aproximadamente 7.389.'
      }
    ],
    category: 'Matemáticas',
    relatedFunctions: ['Ln', 'Power', 'Log']
  },
  {
    id: 'ln',
    name: 'Ln',
    syntax: 'Ln( Number )',
    description: 'Devuelve el logaritmo natural (base e) de un número.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Calcular el logaritmo natural de 10',
        code: `Ln(10)`,
        explanation: 'Devuelve aproximadamente 2.302.'
      }
    ],
    category: 'Matemáticas',
    relatedFunctions: ['Exp', 'Log']
  },
  {
    id: 'log',
    name: 'Log',
    syntax: 'Log( Number [, Base ] )',
    description: 'Devuelve el logaritmo de un número en la base especificada (o base 10 si no se especifica).',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Calcular el logaritmo base 10 de 100',
        code: `Log(100)`,
        explanation: 'Devuelve 2.'
      },
      {
        title: 'Calcular el logaritmo base 2 de 8',
        code: `Log(8, 2)`,
        explanation: 'Devuelve 3.'
      }
    ],
    category: 'Matemáticas',
    relatedFunctions: ['Ln', 'Exp', 'Power']
  },
  {
    id: 'rand',
    name: 'Rand',
    syntax: 'Rand()',
    description: 'Devuelve un número pseudoaleatorio entre 0 (inclusive) y 1 (exclusive).',
    delegationNotes: 'No aplicable (se evalúa localmente).',
    examples: [
      {
        title: 'Generar un número aleatorio entre 1 y 10',
        code: `RoundUp(Rand() * 9, 0) + 1`,
        explanation: 'Genera un entero aleatorio.'
      }
    ],
    category: 'Matemáticas',
    relatedFunctions: ['RandBetween']
  },
   {
    id: 'randbetween',
    name: 'RandBetween',
    syntax: 'RandBetween( Bottom, Top [, Seed] )',
    description: 'Devuelve un número entero pseudoaleatorio entre dos números, ambos inclusive. Opcionalmente, se puede proporcionar una semilla para la generación.',
    delegationNotes: 'No aplicable (se evalúa localmente).',
    examples: [
      {
        title: 'Generar un número aleatorio entre 50 y 100',
        code: `RandBetween(50, 100)`,
        explanation: 'Devuelve un entero aleatorio dentro del rango especificado.'
      }
    ],
    category: 'Matemáticas',
    relatedFunctions: ['Rand']
  },
  {
    id: 'sequence',
    name: 'Sequence',
    syntax: 'Sequence( Records [, Start [, Step ] ] )',
    description: 'Genera una tabla de una sola columna ("Value") con números secuenciales.',
    delegationNotes: 'No aplicable (genera datos localmente).',
    examples: [
      {
        title: 'Generar una tabla de números del 1 al 5',
        code: `Sequence(5)`,
        explanation: 'Devuelve una tabla con una columna "Value" y filas 1, 2, 3, 4, 5.'
      },
      {
        title: 'Generar una tabla de números pares del 2 al 10',
        code: `Sequence(5, 2, 2)`,
        explanation: 'Devuelve una tabla con filas 2, 4, 6, 8, 10.'
      }
    ],
    category: 'Generación de Tablas',
    relatedFunctions: ['ForAll']
  },

  // --- Funciones de Contexto y Comportamiento ---
  {
    id: 'user',
    name: 'User',
    syntax: 'User()',
    description: 'Devuelve información sobre el usuario actualmente conectado a la aplicación.',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Mostrar el nombre completo del usuario',
        code: `User().FullName`
      },
      {
        title: 'Obtener el email del usuario',
        code: `User().Email`
      },
      {
        title: 'Obtener la imagen del usuario (si está disponible)',
        code: `User().Image`
      }
    ],
    category: 'Contexto',
    relatedFunctions: ['Param', 'DataSourceInfo']
  },
  {
    id: 'param',
    name: 'Param',
    syntax: 'Param( ParameterName )',
    description: 'Recupera un parámetro pasado a la aplicación a través de la URL al iniciarla.',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Obtener un ID de registro de la URL',
        code: `// URL: ...&RecordID=123
Param("RecordID")`,
        explanation: 'Devuelve "123" si se pasó el parámetro RecordID.'
      }
    ],
    category: 'Contexto',
    relatedFunctions: ['User', 'Launch']
  },
  {
    id: 'language',
    name: 'Language',
    syntax: 'Language()',
    description: 'Devuelve la etiqueta de idioma del usuario actual (ej. "en-US", "es-ES").',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Mostrar el idioma del usuario',
        code: `Language()`,
        explanation: 'Útil para adaptar contenido o formatos.'
      }
    ],
    category: 'Contexto',
    relatedFunctions: ['Text', 'Calendar']
  },
  {
    id: 'navigate',
    name: 'Navigate',
    syntax: 'Navigate( TargetScreen [, Transition [, UpdateContextRecord ] ] )',
    description: 'Navega a otra pantalla. Opcionalmente, especifica una transición y pasa un registro de contexto a la pantalla de destino.',
    delegationNotes: 'No aplicable (función de comportamiento).',
    examples: [
      {
        title: 'Navegación simple a otra pantalla',
        code: `Navigate(Screen2, ScreenTransition.Cover)`,
        explanation: 'Navega a Screen2 con una transición de tipo Cover.'
      },
      {
        title: 'Navegar pasando datos de contexto',
        code: `Navigate(EditScreen, ScreenTransition.Fade, { currentItem: Gallery1.Selected })`,
        explanation: 'Navega a EditScreen, pasando el ítem seleccionado de Gallery1.'
      }
    ],
    category: 'Navegación y Comportamiento',
    relatedFunctions: ['Back', 'UpdateContext', 'Set']
  },
  {
    id: 'back',
    name: 'Back',
    syntax: 'Back( [Transition] )',
    description: 'Navega a la pantalla mostrada anteriormente. Opcionalmente, especifica una transición.',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Volver a la pantalla anterior con una transición',
        code: `Back(ScreenTransition.UnCover)`
      }
    ],
    category: 'Navegación y Comportamiento',
    relatedFunctions: ['Navigate']
  },
  {
    id: 'reset',
    name: 'Reset',
    syntax: 'Reset( Control )',
    description: 'Restablece un control de entrada a su valor predeterminado.',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Limpiar un campo de texto',
        code: `Reset(TextInputSearch)`
      }
    ],
    category: 'Comportamiento',
    relatedFunctions: ['SetFocus', 'ResetForm']
  },
  {
    id: 'resetform',
    name: 'ResetForm',
    syntax: 'ResetForm( FormName )',
    description: 'Restablece un control de Formulario a su estado inicial (para un nuevo registro o para descartar cambios).',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Limpiar un formulario después de enviar',
        code: `// En la propiedad OnSuccess del Formulario:
ResetForm(EditForm1); NewForm(EditForm1)`
      }
    ],
    category: 'Comportamiento',
    relatedFunctions: ['SubmitForm', 'NewForm', 'EditForm', 'ViewForm', 'Reset']
  },
  {
    id: 'setfocus',
    name: 'SetFocus',
    syntax: 'SetFocus( Control )',
    description: 'Mueve el foco de entrada a un control específico.',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Poner el foco en un campo de texto después de limpiar un formulario',
        code: `ResetForm(EditForm1); SetFocus(TextInputFirstName)`
      }
    ],
    category: 'Comportamiento',
    relatedFunctions: ['Reset']
  },
  {
    id: 'notify',
    name: 'Notify',
    syntax: 'Notify( Message [, NotificationType [, Timeout ] ] )',
    description: 'Muestra un mensaje de notificación al usuario.',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Mostrar un mensaje de éxito',
        code: `Notify("Datos guardados correctamente.", NotificationType.Success, 3000) // 3 segundos`
      },
      {
        title: 'Mostrar un mensaje de error',
        code: `Notify("Error al procesar la solicitud.", NotificationType.Error)`
      }
    ],
    category: 'Comportamiento',
    relatedFunctions: []
  },
  {
    id: 'launch',
    name: 'Launch',
    syntax: 'Launch( Address [, ParameterName1, ParameterValue1, ... ] )',
    description: 'Abre una dirección web o una aplicación. Opcionalmente, pasa parámetros.',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Abrir un sitio web en una nueva pestaña',
        code: `Launch("https://www.microsoft.com")`
      },
      {
        title: 'Iniciar una llamada telefónica (en dispositivos compatibles)',
        code: `Launch("tel:+15551234567")`
      },
      {
        title: 'Abrir otra Power App pasando parámetros',
        code: `Launch("https://apps.powerapps.com/play/...", "RecordID", ThisItem.ID, "Mode", "View")`
      }
    ],
    category: 'Comportamiento',
    relatedFunctions: ['Param', 'Download']
  },
  {
    id: 'download',
    name: 'Download',
    syntax: 'Download( AddressOrData )',
    description: 'Descarga un archivo desde una URL o datos binarios (ej. una imagen de un control PenInput) al dispositivo del usuario.',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Descargar un archivo PDF desde una URL',
        code: `Download("https://ejemplo.com/documento.pdf")`
      },
      {
        title: 'Descargar la imagen de un control PenInput',
        code: `Download(PenInput1.Image)`
      }
    ],
    category: 'Comportamiento',
    relatedFunctions: ['Launch']
  },
  {
    id: 'exit',
    name: 'Exit( [SignOut] )',
    name: 'Exit',
    syntax: 'Exit( [SignOut] )',
    description: 'Cierra la aplicación actual. Si el argumento opcional SignOut es verdadero, también cierra la sesión del usuario.',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Cerrar la aplicación',
        code: `Exit()`
      },
      {
        title: 'Cerrar la aplicación y cerrar sesión',
        code: `Exit(true)`
      }
    ],
    category: 'Comportamiento',
    relatedFunctions: []
  },
  {
    id: 'set',
    name: 'Set',
    syntax: 'Set( VariableName, Value )',
    description: 'Establece el valor de una variable global. Si la variable no existe, Set la crea.',
    delegationNotes: 'No aplicable (opera con variables globales).',
    examples: [
      {
        title: 'Establecer una variable global al iniciar la app',
        code: `// En App.OnStart
Set(gblAppTheme, "Dark")`
      }
    ],
    category: 'Variables',
    relatedFunctions: ['UpdateContext', 'Collect', 'ClearCollect']
  },
  {
    id: 'updatecontext',
    name: 'UpdateContext',
    syntax: 'UpdateContext( { ContextVariable1: Value1 [, ContextVariable2: Value2, ... ] } )',
    description: 'Crea o actualiza una o más variables de contexto para la pantalla actual.',
    delegationNotes: 'No aplicable (opera con variables de contexto).',
    examples: [
      {
        title: 'Mostrar un pop-up y almacenar un ítem seleccionado',
        code: `UpdateContext({ locShowPopup: true, locSelectedItem: Gallery1.Selected })`
      }
    ],
    category: 'Variables',
    relatedFunctions: ['Set', 'Navigate']
  },
  
  // --- Funciones de Información de Origen de Datos ---
  {
    id: 'datasourceinfo',
    name: 'DataSourceInfo',
    syntax: 'DataSourceInfo( DataSource, InformationEnum, ColumnName )',
    description: 'Proporciona información sobre un origen de datos, como la longitud máxima de una columna de texto, si una columna es obligatoria, o los valores permitidos para una columna de elección.',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Obtener la longitud máxima de una columna de texto',
        code: `DataSourceInfo(Products, DataSourceInfo.MaxLength, "ProductName")`,
        explanation: 'Devuelve el número máximo de caracteres permitidos para ProductName.'
      },
      {
        title: 'Verificar si una columna es obligatoria',
        code: `DataSourceInfo(Orders, DataSourceInfo.Required, "OrderDate")`,
        explanation: 'Devuelve true si OrderDate es una columna obligatoria.'
      },
      {
        title: 'Obtener los valores permitidos para una columna de elección',
        code: `DataSourceInfo(Tasks, DataSourceInfo.AllowedValues, "Status")`,
        explanation: 'Devuelve una tabla con los valores permitidos para la columna Status.'
      }
    ],
    category: 'Información de Datos',
    relatedFunctions: ['Choices']
  },
  {
    id: 'choices',
    name: 'Choices',
    syntax: 'Choices( DataSource.ColumnName )',
    description: 'Devuelve una tabla de una sola columna con los valores posibles para una columna de tipo Elección (Choice) o Búsqueda (Lookup) de un origen de datos.',
    delegationNotes: 'Delegable.',
    examples: [
      {
        title: 'Poblar un desplegable con las opciones de una columna Choice',
        code: `// En la propiedad Items de un Dropdown:
Choices(Products.Category)`,
        explanation: 'Muestra las opciones disponibles en la columna Category de la tabla Products.'
      }
    ],
    category: 'Información de Datos',
    relatedFunctions: ['DataSourceInfo', 'Distinct']
  },
  {
    id: 'distinct',
    name: 'Distinct',
    syntax: 'Distinct( Table, FormulaOrColumnName )',
    description: 'Devuelve una tabla de una sola columna ("Result") con los valores únicos de una fórmula o columna evaluada para cada registro de una tabla.',
    delegationNotes: 'Delegable para orígenes de datos que lo soportan.',
    examples: [
      {
        title: 'Obtener una lista de todas las categorías de productos únicas',
        code: `Distinct(Products, Category)`,
        explanation: 'Devuelve una tabla con una columna "Result" que contiene cada categoría única una vez.'
      }
    ],
    category: 'Manipulación de Tablas',
    relatedFunctions: ['Choices', 'ShowColumns']
  },

  // --- Funciones de Color ---
  {
    id: 'colorvalue',
    name: 'ColorValue',
    syntax: 'ColorValue( CSSColorNameOrHexString )',
    description: 'Convierte un nombre de color CSS (ej. "Red", "LightBlue") o un código hexadecimal (ej. "#FF0000") en un valor de color.',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Establecer el color de fondo de un control',
        code: `Fill: ColorValue("DodgerBlue")`
      },
      {
        title: 'Usar un código hexadecimal para el color',
        code: `Color: ColorValue("#107C10") // Verde oscuro de Microsoft`
      }
    ],
    category: 'Color y UI',
    relatedFunctions: ['RGBA', 'ColorFade']
  },
  {
    id: 'rgba',
    name: 'RGBA',
    syntax: 'RGBA( Red, Green, Blue, Alpha )',
    description: 'Crea un valor de color a partir de los componentes Rojo, Verde, Azul y Alfa (transparencia). Los valores de color van de 0 a 255, Alfa de 0 (transparente) a 1 (opaco).',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Crear un color rojo semitransparente',
        code: `RGBA(255, 0, 0, 0.5) // Rojo con 50% de opacidad`
      }
    ],
    category: 'Color y UI',
    relatedFunctions: ['ColorValue', 'ColorFade']
  },
  {
    id: 'colorfade',
    name: 'ColorFade',
    syntax: 'ColorFade( ColorValue, FadePercentage )',
    description: 'Crea un nuevo color aclarando u oscureciendo un color existente en un porcentaje. Un porcentaje positivo aclara, uno negativo oscurece.',
    delegationNotes: 'No aplicable.',
    examples: [
      {
        title: 'Aclarar un color base en un 20%',
        code: `ColorFade(Color.PrimaryBlue, 20%)`
      },
      {
        title: 'Oscurecer un color base en un 30%',
        code: `ColorFade(Color.Red, -30%)`
      }
    ],
    category: 'Color y UI',
    relatedFunctions: ['ColorValue', 'RGBA']
  }
  // ... (se pueden añadir muchas más funciones aquí)
];