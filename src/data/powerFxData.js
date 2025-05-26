// src/data/powerFxData.js
export const powerFxFunctions = [
  {
    id: 'patch',
    name: 'Patch',
    syntax: 'Patch( DataSource, BaseRecord, ChangeRecord1 [, ChangeRecord2, … ] )',
    description: 'Modifica o crea uno o varios registros en un origen de datos, o combina registros fuera de un origen de datos.',
    delegationNotes: 'Delegable para la mayoría de orígenes de datos cuando se usa para modificar registros existentes. La creación de registros puede no ser delegable en todos los casos.',
    examples: [
      {
        title: 'Crear un nuevo registro',
        code: `Patch(
  Products,
  Defaults(Products),
  {
    Name: "New Product",
    Price: 19.99,
    Stock: 100
  }
)`,
        explanation: 'Este ejemplo crea un nuevo producto en la colección "Products".'
      },
      {
        title: 'Modificar un registro existente',
        code: `Patch(
  Products,
  LookUp(Products, ID = 1), // Asume que hay un producto con ID 1
  {
    Price: 24.99,
    Stock: Stock - 10 // Reduce el stock en 10
  }
)`,
        explanation: 'Este ejemplo actualiza el precio y el stock del producto con ID 1.'
      },
      {
        title: 'Modificar un registro usando ThisItem (en una galería)',
        code: `// Dentro de una galería conectada a 'Products'
// En el OnSelect de un botón:
Patch(
  Products,
  ThisItem,
  {
    IsFeatured: true
  }
)`,
        explanation: 'Marca el producto actual de la galería como destacado.'
      }
    ],
    category: 'Modificación de Datos',
    relatedFunctions: ['Collect', 'UpdateIf', 'RemoveIf', 'SubmitForm']
  },
  {
    id: 'filter',
    name: 'Filter',
    syntax: 'Filter( Table, Formula1 [, Formula2, … ] )',
    description: 'Devuelve una tabla que contiene un subconjunto de registros de otra tabla.',
    delegationNotes: 'Delegable para la mayoría de las funciones y operadores en orígenes de datos compatibles (SharePoint, Dataverse, SQL Server).',
    examples: [
      {
        title: 'Filtrar por una condición simple',
        code: `Filter(
  Products,
  Stock < 10
)`,
        explanation: 'Devuelve todos los productos cuyo stock es menor a 10.'
      },
      {
        title: 'Filtrar por múltiples condiciones (AND implícito)',
        code: `Filter(
  Products,
  Price > 50,
  Category = "Electronics"
)`,
        explanation: 'Devuelve productos electrónicos con precio mayor a 50.'
      },
      {
        title: 'Filtrar usando un control de entrada de texto',
        code: `Filter(
  Products,
  StartsWith(Name, TextInputSearch.Text)
)`,
        explanation: 'Devuelve productos cuyo nombre comienza con el texto ingresado en TextInputSearch.'
      }
    ],
    category: 'Manipulación de Tablas',
    relatedFunctions: ['Search', 'LookUp', 'Sort', 'AddColumns']
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
      },
      {
        title: 'Obtener el registro completo de un cliente por ID',
        code: `LookUp(Customers, CustomerID = varSelectedCustomerID)`,
        explanation: 'Devuelve el registro completo del cliente cuyo ID coincide con varSelectedCustomerID.'
      }
    ],
    category: 'Búsqueda de Datos',
    relatedFunctions: ['Filter', 'Search', 'First']
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
        code: `Maps(Screen2, ScreenTransition.Cover)`,
        explanation: 'Navega a Screen2 con una transición de tipo Cover.'
      },
      {
        title: 'Navegar pasando datos de contexto',
        code: `Maps(
    EditScreen,
    ScreenTransition.Fade,
    { currentItem: Gallery1.Selected }
)`,
        explanation: 'Navega a EditScreen, pasando el ítem seleccionado de Gallery1 como una variable de contexto llamada currentItem.'
      }
    ],
    category: 'Navegación y Comportamiento',
    relatedFunctions: ['Back', 'UpdateContext']
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
    id: 'sortbycolumns',
    name: 'SortByColumns',
    syntax: 'SortByColumns( Table, ColumnName1 [, SortOrder1 [, ColumnName2, SortOrder2, ... ] ] )',
    description: 'Ordena una tabla basándose en una o más columnas.',
    delegationNotes: 'Delegable para la mayoría de los orígenes de datos si se ordena por columnas simples. El número de columnas de ordenación delegables puede variar.',
    examples: [
      {
        title: 'Ordenar productos por precio ascendente',
        code: `SortByColumns(Products, "Price", SortOrder.Ascending)`,
        explanation: 'Devuelve la tabla Products ordenada por la columna Price de menor a mayor.'
      },
      {
        title: 'Ordenar clientes por apellido y luego por nombre',
        code: `SortByColumns(Customers, "LastName", SortOrder.Ascending, "FirstName", SortOrder.Ascending)`,
        explanation: 'Ordena la tabla Customers primero por LastName y luego por FirstName para aquellos con el mismo apellido.'
      }
    ],
    category: 'Manipulación de Tablas',
    relatedFunctions: ['Sort', 'Filter', 'Search']
  },
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
      },
      {
        title: 'Cambiar el color de un texto basado en un valor',
        code: `If(Value(DataCardValue1.Text) > 100, Color.Red, Color.Green)`,
        explanation: 'Establece el color del texto a Rojo si el valor es mayor que 100, de lo contrario a Verde.'
      }
    ],
    category: 'Lógica',
    relatedFunctions: ['Switch', 'And', 'Or', 'Not']
  },
  {
    id: 'switch',
    name: 'Switch',
    syntax: 'Switch( Formula, MatchValue1, Result1 [, MatchValue2, Result2, ... [, DefaultResult ] ] )',
    description: 'Compara una fórmula con una serie de valores. Devuelve el resultado correspondiente al primer valor coincidente. Si no hay coincidencias, devuelve el DefaultResult opcional.',
    delegationNotes: 'Delegable si la fórmula a evaluar y los resultados son delegables.',
    examples: [
      {
        title: 'Asignar un nivel de prioridad basado en texto',
        code: `Switch(
    DropdownPriority.Selected.Value,
    "Alta", 1,
    "Media", 2,
    "Baja", 3,
    0 // Resultado por defecto si no coincide
)`,
        explanation: 'Devuelve 1, 2, o 3 según la selección en DropdownPriority, o 0 si no hay coincidencia.'
      },
      {
        title: 'Mostrar diferentes iconos según el estado',
        code: `Switch(
    ThisItem.Status,
    "Completado", Icon.Check,
    "En Progreso", Icon.Information,
    "Bloqueado", Icon.Warning,
    Icon.Circle // Icono por defecto
)`
      }
    ],
    category: 'Lógica',
    relatedFunctions: ['If']
  }
];

export const userSnippets = [
    {
        id: 'snippet1',
        title: 'Obtener Usuario Actual',
        description: 'Snippet para obtener el nombre completo del usuario conectado.',
        code: 'User().FullName',
        tags: ['usuario', 'común', 'contexto'],
        language: 'powerfx'
    },
    {
        id: 'snippet2',
        title: 'Formatear Fecha a DD/MM/YYYY',
        description: 'Convierte un valor de fecha a formato de texto DD/MM/YYYY.',
        code: 'Text(Today(), "dd/mm/yyyy")',
        tags: ['fecha', 'formato', 'texto'],
        language: 'powerfx'
    },
    {
        id: 'snippet3',
        title: 'Validar Email Básico',
        description: 'Verifica si un texto parece una dirección de correo electrónico válida.',
        code: 'IsMatch(TextInputEmail.Text, Match.Email)',
        tags: ['validación', 'email', 'ismatch'],
        language: 'powerfx'
    },
    {
        id: 'snippet4',
        title: 'Generar GUID',
        description: 'Crea un Identificador Único Global (GUID).',
        code: 'GUID()',
        tags: ['identificador', 'único', 'datos'],
        language: 'powerfx'
    },
    {
        id: 'snippet5',
        title: 'Resetear Control de Entrada',
        description: 'Limpia el valor de un control de entrada de texto.',
        code: 'Reset(TextInputName)',
        tags: ['formulario', 'reset', 'input'],
        language: 'powerfx'
    },
    {
        id: 'snippet6',
        title: 'Concatenar Cadenas',
        description: 'Une dos o más cadenas de texto.',
        code: 'Concatenate("Hola ", User().FullName, "!")\n// Alternativa con operador &:\n"Hola " & User().FullName & "!"',
        tags: ['texto', 'concatenar', 'string'],
        language: 'powerfx'
    },
    {
        id: 'snippet7',
        title: 'Color Semitransparente',
        description: 'Crea un color con un nivel de transparencia (alpha).',
        code: 'ColorFade(Color.PrimaryBlue, 50%) // 50% de transparencia\n// Alternativa con RGBA:\nRGBA(0, 120, 212, 0.5) // Azul primario con 50% de opacidad',
        tags: ['color', 'ui', 'transparencia', 'colorfade', 'rgba'],
        language: 'powerfx'
    }
];

export const variablesData = [
  {
    id: 'global-vars',
    name: 'Variables Globales',
    description: 'Las variables globales almacenan información que se puede usar en cualquier pantalla de la aplicación. Son útiles para valores que necesitan ser accesibles globalmente, como información del usuario o configuraciones de la aplicación.',
    scope: 'Toda la aplicación (App).',
    syntax: [
      { operation: 'Declarar / Establecer valor', code: 'Set( NombreVariableGlobal, Valor )' },
      { operation: 'Usar valor', code: 'NombreVariableGlobal' }
    ],
    examples: [
      { 
        title: 'Establecer y usar una variable global para el nombre de usuario',
        explanation: 'En App.OnStart o en un botón de inicio de sesión:',
        code: 'Set( gblCurrentUser, User().FullName );\n\n// En una etiqueta en cualquier pantalla:\nLabel.Text = gblCurrentUser'
      },
      {
        title: 'Alternar un estado global (ej. modo de edición)',
        code: 'Set( gblEditMode, !gblEditMode )'
      },
      {
        title: 'Almacenar un valor numérico global',
        code: 'Set( gblAppVersion, 1.2 )'
      },
      {
        title: 'Almacenar una tabla de configuración global',
        code: `// En App.OnStart
Set(
    gblAppSettings,
    Table(
        { Key: "AppName", Value: "Mi Super App" },
        { Key: "SupportEmail", Value: "soporte@example.com" },
        { Key: "MaxItemsPerPage", Value: 20 }
    )
)

// Para obtener un valor: LookUp(gblAppSettings, Key = "SupportEmail").Value`
      }
    ],
    bestPractices: [
      'Usar un prefijo claro (ej. "gbl" o "varGlobal") para identificarlas fácilmente.',
      'Inicializarlas en App.OnStart si es necesario que estén disponibles desde el inicio.',
      'Evitar el uso excesivo; considerar variables de contexto para información específica de una pantalla.',
      'Documentar su propósito si la aplicación es compleja.'
    ],
    commonPitfalls: [
      'Olvidar inicializarlas puede llevar a errores si se usan antes de ser establecidas.',
      'No son reactivas por sí mismas; si cambias una variable global, los controles que la usan no se actualizan automáticamente a menos que la fórmula del control dependa directamente de ella o se fuerce una reevaluación.',
      'Modificarlas desde múltiples lugares sin un control claro puede dificultar el seguimiento del estado de la app.'
    ]
  },
  {
    id: 'context-vars',
    name: 'Variables de Contexto',
    description: 'Las variables de contexto almacenan información que solo está disponible dentro de la pantalla donde se declaran. Son ideales para gestionar el estado de una pantalla específica, como la visibilidad de un control o datos temporales para un formulario.',
    scope: 'Pantalla actual (Screen).',
    syntax: [
      { operation: 'Declarar / Establecer valor', code: 'UpdateContext( { NombreVariableContexto: Valor } )' },
      { operation: 'Establecer múltiples variables de contexto', code: 'UpdateContext( { Var1: Valor1, Var2: Valor2 } )' },
      { operation: 'Usar valor', code: 'NombreVariableContexto' }
    ],
    examples: [
      {
        title: 'Controlar la visibilidad de un pop-up',
        explanation: 'En un botón para mostrar el pop-up:',
        code: 'UpdateContext( { locShowPopup: true } );\n\n// En la propiedad Visible del pop-up:\nlocShowPopup\n\n// En un botón para cerrar el pop-up:\nUpdateContext( { locShowPopup: false } )'
      },
      {
        title: 'Almacenar el item seleccionado de una galería para un formulario',
        code: '// En la propiedad OnSelect de una Galería:\nUpdateContext( { locSelectedItem: ThisItem } );\n\n// En las propiedades Default de los controles de un formulario:\nlocSelectedItem.NombreColumna'
      },
      {
        title: 'Resetear campos de un formulario en la misma pantalla',
        code: `// En un botón "Limpiar Formulario"
UpdateContext({
    locTextInputValue: Blank(),
    locDropdownValue: Blank(),
    locDateValue: Today() 
})`
      },
      {
        title: 'Pasar datos a otra pantalla al navegar',
        explanation: 'En el botón que navega:',
        code: `Maps(
    DetalleScreen,
    ScreenTransition.Cover,
    { // Este es el registro de contexto
        ctxSelectedItem: Gallery1.Selected,
        ctxPreviousScreen: App.ActiveScreen.Name
    }
)
// En DetalleScreen, puedes acceder a ctxSelectedItem y ctxPreviousScreen`
      }
    ],
    bestPractices: [
      'Usar un prefijo claro (ej. "loc" o "ctx") para identificarlas.',
      'Limitar su uso a la pantalla donde son necesarias.',
      'Para pasar datos entre pantallas, usar la función Navigate con su tercer argumento, o variables globales si es estrictamente necesario.',
      'Agrupar actualizaciones de múltiples variables de contexto en una sola llamada a UpdateContext si es posible.'
    ],
    commonPitfalls: [
      'Intentar acceder a una variable de contexto desde otra pantalla (no funcionará).',
      'Anidar UpdateContext de forma compleja puede dificultar la lectura del código.',
      'Olvidar que se resetean al salir y volver a entrar a la pantalla, a menos que se pasen explícitamente con Navigate.'
    ]
  },
  {
    id: 'collections',
    name: 'Colecciones',
    description: 'Las colecciones son variables que almacenan tablas de datos en la memoria de la aplicación. Son extremadamente útiles para trabajar con conjuntos de registros, como datos de un origen externo que se quieren manipular localmente, o para crear tablas temporales.',
    scope: 'Toda la aplicación (App), similar a las variables globales.',
    syntax: [
      { operation: 'Crear / Añadir registros', code: 'Collect( NombreColeccion, Elemento_o_Tabla )' },
      { operation: 'Limpiar y crear/añadir registros', code: 'ClearCollect( NombreColeccion, Elemento_o_Tabla )' },
      { operation: 'Eliminar registros', code: 'Remove( NombreColeccion, Condicion_o_Elemento ) // RemoveIf( NombreColeccion, Condicion )' },
      { operation: 'Actualizar registros', code: 'Patch( NombreColeccion, RegistroBase, Cambios )' },
      { operation: 'Limpiar todos los registros', code: 'Clear( NombreColeccion )' }
    ],
    examples: [
      {
        title: 'Crear una colección de tareas pendientes',
        code: `ClearCollect( colTasks, 
  { ID: 1, TaskName: "Comprar leche", IsDone: false, Priority: "Alta" },
  { ID: 2, TaskName: "Pagar facturas", IsDone: true, Priority: "Media" }
)`
      },
      {
        title: 'Añadir un nuevo item a una colección existente',
        code: `Collect( colTasks, { ID: Max(colTasks, ID) + 1, TaskName: "Nueva tarea", IsDone: false, Priority: "Baja" } )`
      },
      {
        title: 'Filtrar una colección y mostrarla en una galería',
        code: '// En la propiedad Items de una Galería:\nFilter( colTasks, !IsDone && Priority = "Alta" ) // Muestra tareas no completadas de alta prioridad'
      },
      {
        title: 'Eliminar un ítem específico de una colección',
        code: `// Asumiendo que GalleryTasks.Selected contiene el ítem a eliminar
Remove( colTasks, GalleryTasks.Selected )`
      },
      {
        title: 'Actualizar un registro específico en una colección',
        explanation: 'Asume que colTasks tiene un registro con ID 1.',
        code: `Patch(
    colTasks,
    LookUp(colTasks, ID = 1), // Registro base a actualizar
    { IsDone: true, CompletionDate: Today() } // Cambios a aplicar
)`
      }
    ],
    bestPractices: [
      'Usar un prefijo claro (ej. "col") para identificarlas.',
      'Inicializar con ClearCollect en App.OnStart si se necesitan datos desde el inicio o para resetearla.',
      'Ser consciente del tamaño de las colecciones, ya que consumen memoria del dispositivo.',
      'Aprovechar las funciones de manipulación de tablas (Filter, Sort, AddColumns, etc.) para trabajar con ellas.',
      'Considerar el uso de SaveData() y LoadData() para persistencia simple entre sesiones si no se usa un backend.'
    ],
    commonPitfalls: [
      'Usar Collect cuando se quiere reemplazar toda la colección (usar ClearCollect en su lugar).',
      'Modificar colecciones grandes con mucha frecuencia puede impactar el rendimiento.',
      'Las colecciones no se guardan automáticamente entre sesiones; se deben guardar en un origen de datos si se requiere persistencia más allá de SaveData/LoadData.',
      'Errores de coincidencia de esquema al usar Patch o Collect con registros que tienen diferentes columnas.'
    ]
  }
];

export const patronesData = [
  {
    id: 'delegable-search-filter',
    name: 'Búsqueda y Filtrado Delegable Combinados',
    problem: 'Necesitas buscar texto en múltiples columnas y aplicar filtros adicionales (ej. por un Choice o Boolean) de una manera que sea delegable a orígenes de datos como SharePoint o Dataverse para evitar límites de procesamiento local.',
    solution: `Combina la función Search() para la búsqueda de texto libre con Filter() para las condiciones exactas. Asegúrate de que las columnas en las que buscas con Search() estén indexadas en tu origen de datos y que los operadores usados en Filter() sean delegables.
    
    La clave es anidar o encadenar las funciones de forma que la delegación se mantenga. A menudo, se aplica el Filter() sobre el resultado de Search(), o se usan condiciones combinadas con && (AND).`,
    useCases: [
      'Listas de inventario con búsqueda por nombre/descripción y filtro por categoría.',
      'Directorios de empleados con búsqueda por nombre/departamento y filtro por estado (activo/inactivo).',
      'Seguimiento de tareas con búsqueda por título y filtro por prioridad o estado.',
    ],
    implementationSteps: [
      {
        title: 'Fórmula Base',
        details: 'Asume una lista de SharePoint llamada "Productos" con columnas "Título" (Texto), "Descripción" (Texto), "Categoría" (Choice), y "EnStock" (Sí/No).',
        code: `Filter(
    Search(
        Productos,
        TextInputSearch.Text, // Control de entrada para búsqueda
        "Título", // Columna para buscar
        "Descripción" // Otra columna para buscar
    ),
    // Filtros adicionales delegables
    (IsBlank(DropdownCategory.Selected.Value) || Categoría.Value = DropdownCategory.Selected.Value) &&
    (CheckboxInStock.Value = false || EnStock = true) // Si el checkbox no está marcado, no filtra por stock; si está marcado, solo en stock.
)`
      },
      {
        title: 'Explicación de la Delegación',
        details: `1. Search(): Es delegable para columnas de texto.
2. Filter(): 
   - La comparación Categoría.Value = DropdownCategory.Selected.Value es delegable para columnas Choice.
   - La condición IsBlank(DropdownCategory.Selected.Value) permite un filtro opcional (si no se selecciona nada en el dropdown, esta parte es true).
   - La lógica para EnStock también es delegable.
   - El operador && (AND) es delegable.`,
      },
      {
        title: 'Interfaz de Usuario (UI)',
        details: `- TextInputSearch: Un control de entrada de texto para el término de búsqueda.
- DropdownCategory: Un desplegable para seleccionar la categoría (Items: Choices(Productos.Categoría)).
- CheckboxInStock: Un checkbox para filtrar por disponibilidad.
- Galería: Para mostrar los resultados (Items: la fórmula anterior).`,
      }
    ],
    benefits: [
      'Rendimiento óptimo al procesar grandes cantidades de datos en el servidor.',
      'Evita advertencias de delegación y límites de 500/2000 registros procesados localmente.',
      'Experiencia de usuario fluida incluso con grandes conjuntos de datos.',
    ],
    considerations: [
      'Verifica siempre la delegabilidad de cada función y operador con tu origen de datos específico (el icono de advertencia azul en Power Apps Studio es tu amigo).',
      'Las columnas de búsqueda deben ser de tipo texto. Para otros tipos, convierte o usa filtros exactos.',
      'Indexar las columnas relevantes en el origen de datos (ej. SharePoint) puede mejorar el rendimiento de Search().',
      'La complejidad de la consulta puede afectar la delegación. Simplifica si es necesario.'
    ],
    relatedFunctions: ['Search', 'Filter', 'IsBlank', 'StartsWith', 'EndsWith', 'CountRows', 'SortByColumns']
  },
  {
    id: 'loading-spinner',
    name: 'Indicador de Carga (Loading Spinner)',
    problem: 'Las operaciones que toman tiempo (cargar datos, enviar formularios) pueden hacer que la aplicación parezca congelada, frustrando al usuario. Necesitas una forma visual de indicar que algo está sucediendo en segundo plano.',
    solution: `Usa una variable de contexto para controlar la visibilidad de un grupo de controles que simulan un indicador de carga (spinner). Establece la variable a 'true' antes de iniciar la operación larga y a 'false' cuando termine.
    
El indicador puede ser una imagen GIF, un icono giratorio (usando un Timer y la función Rotate), o un simple mensaje de "Cargando...".`,
    useCases: [
      'Al cargar datos en la propiedad OnVisible de una pantalla.',
      'Al enviar datos de un formulario con Patch() o SubmitForm().',
      'Al ejecutar flujos de Power Automate que pueden tardar.',
      'Al aplicar filtros complejos o cargar grandes colecciones.',
    ],
    implementationSteps: [
      {
        title: 'Crear el Indicador Visual',
        details: `1. Añade una imagen (ej. un GIF de spinner) o un icono.
2. Añade una etiqueta con el texto "Cargando..." (opcional).
3. Añade un rectángulo semitransparente para cubrir la pantalla y evitar clics (opcional).
4. Agrupa estos controles. Nombra el grupo, por ejemplo, "grpLoadingSpinner".`,
      },
      {
        title: 'Controlar la Visibilidad',
        details: `En la propiedad Visible del grupo "grpLoadingSpinner", usa una variable de contexto, por ejemplo: locIsLoading`,
        code: `locIsLoading`
      },
      {
        title: 'Implementar la Lógica',
        details: `Antes de una operación larga (ej. en el OnSelect de un botón):`,
        code: `UpdateContext({ locIsLoading: true });
// ... tu operación larga, ej:
// Collect(colData, Filter(DataSource, ...));
// Patch(DataSource, Defaults(DataSource), Form.Updates);
// PowerAutomateFlow.Run(...);

// Después de que la operación termine (puede ser en el OnSuccess de un formulario, o al final del bloque de código):
UpdateContext({ locIsLoading: false });`
      },
      {
        title: 'Ejemplo con Patch y Navegación',
        code: `// En el OnSelect de un botón "Guardar"
UpdateContext({ locIsLoading: true });
Patch(
    MyDataSource,
    Defaults(MyDataSource),
    myForm.Updates,
    {
        OnSuccess: UpdateContext({ locIsLoading: false }); Navigate(ScreenSuccess, ScreenTransition.Fade),
        OnFailure: UpdateContext({ locIsLoading: false }); Notify("Error al guardar", NotificationType.Error)
    }
);`
      }
    ],
    benefits: [
      'Mejora significativamente la experiencia del usuario al proporcionar feedback visual.',
      'Evita que el usuario piense que la aplicación se ha colgado.',
      'Permite realizar operaciones más largas sin interrumpir la percepción de fluidez.',
    ],
    considerations: [
      'Asegúrate de que locIsLoading se establezca en false en todos los escenarios de finalización (éxito, fracaso, cancelación).',
      'Para operaciones muy rápidas, el spinner podría parpadear brevemente. Considera mostrarlo solo si la operación tarda más de X milisegundos (requiere lógica adicional con Timers).',
      'El diseño del spinner debe ser coherente con el resto de la aplicación.',
    ],
    relatedFunctions: ['UpdateContext', 'Set', 'Timer', 'Image', 'Icon', 'Notify']
  },
  {
    id: 'dynamic-form-visibility',
    name: 'Visibilidad Dinámica de Secciones de Formulario',
    problem: 'Tienes un formulario largo y quieres mejorar la UX mostrando/ocultando secciones basadas en selecciones previas del usuario (ej. un dropdown).',
    solution: 'Usa variables de contexto para controlar la propiedad `Visible` de los DataCards o grupos de controles dentro del formulario. Actualiza estas variables en el evento `OnChange` del control que dispara la lógica de visibilidad.',
    useCases: [
      'Mostrar campos adicionales si se selecciona "Otro" en un dropdown.',
      'Ocultar secciones no relevantes basadas en el tipo de solicitud seleccionada.',
      'Formularios de registro con pasos o secciones progresivas.',
    ],
    implementationSteps: [
      {
        title: 'Configurar Variables de Contexto',
        details: 'En el `OnVisible` de la pantalla o en `App.OnStart` (si es un estado más persistente), inicializa las variables de visibilidad.',
        code: `// En Screen.OnVisible
UpdateContext({ locShowDetailsSection: false, locShowAddressSection: true })`
      },
      {
        title: 'Controlar Visibilidad de DataCards/Grupos',
        details: 'En la propiedad `Visible` de los DataCards o grupos de controles que quieres mostrar/ocultar:',
        code: `// Para DataCard "DetailsSectionCard"
locShowDetailsSection

// Para DataCard "AddressSectionCard"
locShowAddressSection`
      },
      {
        title: 'Actualizar Variables en Eventos',
        details: 'En la propiedad `OnChange` del control que determina la visibilidad (ej. un Dropdown llamado `ddRequestType`):',
        code: `// En Dropdown ddRequestType.OnChange
UpdateContext({ 
    locShowDetailsSection: Self.Selected.Value = "Tipo A",
    locShowAddressSection: Self.Selected.Value = "Tipo B" || Self.Selected.Value = "Tipo C"
})`
      }
    ],
    benefits: [
      'Formularios más limpios y menos abrumadores.',
      'Guía al usuario a través del formulario de manera lógica.',
      'Mejora la eficiencia en la entrada de datos.',
    ],
    considerations: [
      'Asegúrate de que el estado inicial de visibilidad sea el correcto.',
      'Considera el impacto en el orden de tabulación si las secciones se ocultan/muestran.',
      'Para formularios muy complejos, considera dividirlo en múltiples pantallas o usar un componente de "pasos".',
    ],
    relatedFunctions: ['UpdateContext', 'If', 'Switch', 'Visible']
  },
  {
    id: 'componentization-ui',
    name: 'Componentización para UI Reutilizable',
    problem: 'Tienes elementos de UI (como cabeceras personalizadas, tarjetas de información, menús) que se repiten en múltiples pantallas y quieres evitar duplicar código y asegurar consistencia.',
    solution: `Crea Componentes de Power Apps (Canvas Components). Encapsula la UI y la lógica común dentro de un componente. Define propiedades de entrada personalizadas para pasar datos al componente y propiedades de salida para comunicar eventos o datos de vuelta a la aplicación.
    
Luego, inserta instancias de este componente en tus pantallas. Cualquier cambio en la definición del componente maestro se reflejará en todas sus instancias.`,
    useCases: [
      'Cabeceras de pantalla con título dinámico y botones de acción.',
      'Tarjetas de perfil de usuario.',
      'Menús de navegación personalizados.',
      'Indicadores de progreso o KPIs estandarizados.',
      'Pop-ups o diálogos modales personalizados.',
    ],
    implementationSteps: [
      {
        title: 'Crear un Componente',
        details: `1. Ve a la pestaña "Componentes" en la vista de árbol.
2. Haz clic en "Nuevo componente".
3. Diseña la UI del componente y añade la lógica necesaria.
4. Define propiedades personalizadas de entrada (Input) y salida (Output) en el panel de propiedades del componente.`,
      },
      {
        title: 'Usar Propiedades de Entrada',
        details: 'Dentro del componente, referencia las propiedades de entrada. Ej: Si tienes una propiedad de entrada `HeaderText` (Texto), en una etiqueta dentro del componente, su propiedad `Text` podría ser `MyComponent.HeaderText`.',
        code: `// Ejemplo de propiedad de entrada: HeaderText (Tipo: Texto)
// Dentro del componente, una etiqueta con Text: MyComponent.HeaderText`
      },
      {
        title: 'Usar Propiedades de Salida (Ej. para un botón)',
        details: 'Si un botón dentro del componente debe realizar una acción en la pantalla contenedora, crea una propiedad de salida de tipo "Evento" (ej. `OnButtonClick`). En el `OnSelect` del botón dentro del componente, llama a `MyComponent.OnButtonClick()`.',
        code: `// Ejemplo de propiedad de salida: OnButtonClick (Tipo: Evento)
// En el OnSelect de un botón DENTRO del componente:
// MyComponent.OnButtonClick()`
      },
      {
        title: 'Insertar y Configurar el Componente en una Pantalla',
        details: `1. Ve a la pantalla donde quieres usar el componente.
2. En el menú "Insertar", busca tu componente en "Personalizado".
3. Selecciona la instancia del componente en la pantalla y configura sus propiedades de entrada en el panel de propiedades.
4. Para propiedades de salida de tipo evento, escribe la fórmula que quieres ejecutar en la pantalla.`,
        code: `// En la pantalla, al seleccionar la instancia del componente:
// Propiedad HeaderText: "Título de Mi Pantalla"
// Propiedad OnButtonClick: Notify("Botón del componente presionado!", NotificationType.Information)`
      }
    ],
    benefits: [
      'Reutilización de código y UI, reduciendo el tiempo de desarrollo.',
      'Mantenimiento más fácil: cambia una vez, actualiza en todas partes.',
      'Consistencia visual y funcional a través de la aplicación.',
      'Abstracción de lógica compleja.',
    ],
    considerations: [
      'Los componentes tienen su propio ámbito; no pueden acceder directamente a variables de contexto de la pantalla (se deben pasar por propiedades).',
      'La delegación dentro de los componentes puede tener matices. Prueba bien con orígenes de datos.',
      'Evita crear componentes excesivamente complejos. A veces, múltiples componentes más pequeños son mejores.',
    ],
    relatedFunctions: ['Component Properties (Input/Output)', 'Self', 'Parent']
  },
  {
    id: 'state-management-collections',
    name: 'Manejo de Estados Complejos con Colecciones de Objetos',
    problem: 'Necesitas gestionar el estado de múltiples elementos dinámicos en la UI (ej. una lista de tareas con sub-tareas expandibles, un wizard con múltiples pasos) donde cada elemento puede tener varios atributos de estado (visible, completado, seleccionado, etc.).',
    solution: 'Usa una colección donde cada registro representa un elemento de la UI y sus propiedades representan sus estados. Modifica esta colección usando `Patch` para actualizar los estados individuales. Las galerías o controles repetidores pueden tener sus `Items` basados en esta colección.',
    useCases: [
      'Listas de tareas con estados de completado y expansión por ítem.',
      'Acordeones o secciones expandibles dinámicas.',
      'Navegación tipo "wizard" donde se marca el estado de cada paso.',
      'Selección múltiple en una galería personalizada.',
    ],
    implementationSteps: [
      {
        title: 'Definir la Estructura de la Colección',
        details: 'En `App.OnStart` o `Screen.OnVisible`, inicializa la colección con los ítems y sus estados iniciales.',
        code: `// Ejemplo: Colección para un acordeón
ClearCollect(
    colAccordionItems,
    { ID: 1, Title: "Sección 1", Content: "Contenido de la sección 1...", IsExpanded: false },
    { ID: 2, Title: "Sección 2", Content: "Contenido de la sección 2...", IsExpanded: true },
    { ID: 3, Title: "Sección 3", Content: "Contenido de la sección 3...", IsExpanded: false }
)`
      },
      {
        title: 'Mostrar los Elementos (Ej. en una Galería)',
        details: 'Usa una galería para mostrar los ítems. Los controles dentro de la plantilla de la galería se vinculan a las propiedades de la colección.',
        // CORRECCIÓN: Se cambió `\`AccordionGallery\`` a `"AccordionGallery"`
        code: `// Galería "AccordionGallery" con Items: colAccordionItems
// Dentro de la plantilla de la galería:
//   LabelTitle.Text: ThisItem.Title
//   LabelContent.Text: ThisItem.Content
//   LabelContent.Visible: ThisItem.IsExpanded
//   IconToggle.Icon: If(ThisItem.IsExpanded, Icon.ChevronUp, Icon.ChevronDown)`
      },
      {
        title: 'Actualizar el Estado (Ej. al hacer clic en un ícono)',
        details: 'En el evento `OnSelect` del control que cambia el estado (ej. `IconToggle`):',
        code: `// En IconToggle.OnSelect
Patch(
    colAccordionItems,
    ThisItem, // El registro a actualizar (el ítem actual de la galería)
    { IsExpanded: !ThisItem.IsExpanded } // El cambio a aplicar
)`
      },
      {
        title: 'Actualizar todos los ítems (Ej. expandir/colapsar todo)',
        code: `// Botón "Expandir Todo"
UpdateIf(colAccordionItems, true, { IsExpanded: true });

// Botón "Colapsar Todo"
UpdateIf(colAccordionItems, true, { IsExpanded: false });`
      }
    ],
    benefits: [
      'Manejo centralizado y claro del estado de múltiples elementos.',
      'Fácil de actualizar estados individuales o grupales con `Patch` o `UpdateIf`.',
      'Escalable para un gran número de elementos dinámicos.',
      'Permite crear interfaces de usuario interactivas y complejas.',
    ],
    considerations: [
      'Para colecciones muy grandes y actualizaciones muy frecuentes, considera el impacto en el rendimiento (aunque `Patch` es generalmente eficiente).',
      'Asegúrate de que los IDs de los ítems en la colección sean únicos si los usas para `LookUp` o `Patch` selectivo.',
      'Si el estado necesita persistir entre sesiones, esta colección deberá guardarse (ej. `SaveData`/`LoadData` o un backend).',
    ],
    relatedFunctions: ['Collect', 'ClearCollect', 'Patch', 'UpdateIf', 'LookUp', 'Filter', 'ForAll']
  }
];

export const checklistsData = [
  {
    id: 'pre-deployment-checklist',
    title: 'Checklist Pre-Despliegue de Aplicación',
    description: 'Asegúrate de revisar estos puntos antes de compartir tu aplicación con los usuarios finales para garantizar una experiencia fluida y profesional.',
    defaultExpanded: true,
    items: [
      { id: 'pdc_1', text: 'Revisión de Rendimiento', details: 'Optimiza fórmulas costosas, reduce el número de controles en pantalla y verifica la delegación.' },
      { 
        id: 'pdc_2', 
        text: 'Pruebas Exhaustivas', 
        details: 'Prueba en diferentes dispositivos y con distintos roles de usuario (si aplica).',
        subItems: [
          { id: 'pdc_2_1', text: 'Pruebas funcionales (todos los botones, flujos).', defaultChecked: false },
          { id: 'pdc_2_2', text: 'Pruebas de UI/UX (consistencia visual, navegación intuitiva).', defaultChecked: false },
          { id: 'pdc_2_3', text: 'Pruebas con datos límite (formularios vacíos, valores extremos).', defaultChecked: false },
          { id: 'pdc_2_4', text: 'Pruebas de delegación (verificar advertencias).', defaultChecked: false },
        ]
      },
      { id: 'pdc_3', text: 'Manejo de Errores', details: 'Implementa notificaciones claras para el usuario en caso de fallos (ej. al guardar datos, ejecutar flujos).', tip: 'Usa Notify() y las propiedades OnFailure/OnSuccess de Patch() o SubmitForm().' },
      { id: 'pdc_4', text: 'Consistencia en el Diseño (UI/UX)', details: 'Verifica fuentes, colores, espaciado y alineación en todas las pantallas.' },
      { id: 'pdc_5', text: 'Nombres de Controles y Variables', details: 'Usa convenciones de nomenclatura claras y consistentes (ej. lblTitulo, txtInputNombre, gblUsuarioActual, locMostrarPopup).', warning: 'Nombres por defecto como "Label1" dificultan el mantenimiento.'},
      { id: 'pdc_6', text: 'Comentarios en Fórmulas Complejas', details: 'Añade comentarios (// o /* */) para explicar la lógica de fórmulas difíciles de entender.' },
      { id: 'pdc_7', text: 'Verificación de Permisos', details: 'Asegúrate de que los usuarios tengan los permisos correctos para los orígenes de datos y flujos utilizados.' },
      { id: 'pdc_8', text: 'Icono y Descripción de la App', details: 'Configura un icono atractivo y una descripción clara en los detalles de la aplicación.' },
      { id: 'pdc_9', text: 'Limpieza de Elementos no Usados', details: 'Elimina variables, colecciones, controles o pantallas que no se utilicen para reducir el tamaño de la app.' },
      { id: 'pdc_10', text: 'Documentación (Opcional pero Recomendado)', details: 'Prepara una breve guía de usuario o notas de la versión si es una app compleja.' },
      { id: 'pdc_11', text: 'Revisar el Comprobador de Aplicación', details: 'Soluciona errores y advertencias importantes que muestre el comprobador de Power Apps Studio.', tip: 'Algunas advertencias de delegación son aceptables si se entienden las implicaciones.'},
    ]
  },
  {
    id: 'new-screen-checklist',
    title: 'Checklist al Crear una Nueva Pantalla',
    description: 'Pasos a considerar cada vez que añades una nueva pantalla a tu aplicación.',
    defaultExpanded: false,
    items: [
      { id: 'nsc_1', text: 'Definir el Propósito Principal de la Pantalla', details: '¿Qué tarea clave realizará el usuario aquí?' },
      { id: 'nsc_2', text: 'Diseño del Layout (Wireframe/Mockup)', details: 'Planifica la disposición de los elementos antes de empezar a añadir controles.' },
      { id: 'nsc_3', text: 'Navegación Clara', details: 'Asegura que el usuario pueda llegar a esta pantalla y salir de ella fácilmente (botones Atrás, Home, etc.).' },
      { id: 'nsc_4', text: 'Carga de Datos (OnVisible)', details: 'Si la pantalla necesita datos, cárgalos eficientemente en la propiedad OnVisible. Considera un indicador de carga.', tip: 'Usa ClearCollect para refrescar datos o Collect para añadir si es acumulativo.' },
      { id: 'nsc_5', text: 'Responsividad (Si Aplica)', details: 'Ajusta el layout para diferentes tamaños de pantalla si es necesario.' },
      { id: 'nsc_6', text: 'Accesibilidad (Consideraciones Básicas)', details: 'Contraste de colores, tamaño de texto legible, navegación por teclado (tabulación).', warning: 'Power Apps tiene limitaciones, pero haz lo posible.' },
      { id: 'nsc_7', text: 'Nombrar Controles Inmediatamente', details: 'Nombra cada control que añades con tu convención antes de usarlo en fórmulas.' },
      { id: 'nsc_8', text: 'Resetear Estados al Entrar/Salir (Si es necesario)', details: 'Considera si necesitas resetear variables de contexto o estados de controles en OnVisible o OnHidden.'},
    ]
  },
  {
    id: 'performance-optimization-checklist',
    title: 'Checklist de Optimización de Rendimiento',
    description: 'Consejos para mejorar la velocidad y eficiencia de tu Power App.',
    defaultExpanded: false,
    items: [
      { id: 'poc_1', text: 'Optimizar App.OnStart', details: 'Minimiza la cantidad de operaciones. Carga solo datos esenciales. Usa Concurrent() para operaciones paralelas.', tip: 'Evita ClearCollect() de grandes fuentes de datos aquí si es posible; carga bajo demanda.'},
      { id: 'poc_2', text: 'Delegación, Delegación, Delegación', details: 'Asegúrate de que tus consultas a orígenes de datos sean delegables para procesar datos en el servidor.', warning: 'Las advertencias de delegación azules indican procesamiento local limitado.'},
      { id: 'poc_3', text: 'Limitar Controles en Pantalla', details: 'Demasiados controles pueden ralentizar la carga y renderizado de la pantalla. Usa galerías eficientemente.'},
      { id: 'poc_4', text: 'Uso Eficiente de Colecciones', details: 'Carga solo las columnas y filas que necesites. Evita colecciones muy grandes si no son imprescindibles.'},
      { id: 'poc_5', text: 'Optimizar Fórmulas Complejas', details: 'Simplifica cálculos. Evita LookUp() o Filter() repetitivos dentro de galerías si puedes hacerlo fuera y referenciar el resultado.'},
      { id: 'poc_6', text: 'Carga Concurrente con Concurrent()', details: 'Ejecuta múltiples fórmulas (como ClearCollects) en paralelo para acelerar la carga inicial.', code: 'Concurrent(ClearCollect(colA, SourceA), ClearCollect(colB, SourceB))'},
      { id: 'poc_7', text: 'Evitar el uso excesivo de Timers para lógica de UI', details: 'Pueden consumir recursos. Úsalos con moderación.'},
      { id: 'poc_8', text: 'Imágenes: Tamaño y Formato', details: 'Usa imágenes optimizadas para la web (ej. .jpg, .png, .svg). Evita imágenes muy pesadas.'},
      { id: 'poc_9', text: 'Desactivar Funcionalidades Experimentales no Usadas', details: 'Revisa en Configuración > Próximas características y desactiva las que no necesites.'},
    ]
  },
  {
    id: 'component-development-checklist',
    title: 'Checklist para Desarrollo de Componentes (Canvas)',
    description: 'Puntos clave a considerar al crear y usar componentes reutilizables en Power Apps.',
    defaultExpanded: false,
    items: [
      { id: 'cdc_1', text: 'Definir Propósito y Alcance Claros', details: '¿Qué problema resuelve el componente? ¿Qué funcionalidad encapsulará?'},
      { id: 'cdc_2', text: 'Diseñar Propiedades de Entrada (Input)', details: 'Identifica qué datos necesita el componente del exterior. Usa tipos de datos apropiados (Texto, Número, Booleano, Tabla, Registro, Color, Imagen, Pantalla, Evento).', tip: 'Proporciona valores por defecto razonables para las propiedades de entrada.'},
      { id: 'cdc_3', text: 'Diseñar Propiedades de Salida (Output)', details: 'Determina qué datos o eventos necesita comunicar el componente hacia afuera. Común para eventos como "OnSelect" o "OnChange".'},
      { id: 'cdc_4', text: 'Nombrar el Componente y sus Propiedades de Forma Clara', details: 'Usa nombres descriptivos (ej. `cmpHeader`, propiedad `HeaderText`).'},
      { id: 'cdc_5', text: 'Construir la UI Interna del Componente', details: 'Añade los controles necesarios y vincula sus propiedades a las propiedades de entrada del componente (ej. `MyComponent.HeaderText`).'},
      { id: 'cdc_6', text: 'Implementar Lógica Interna y Propiedades de Salida', details: 'Ej. En el `OnSelect` de un botón interno, llama a la propiedad de salida de tipo evento: `MyComponent.OnCustomSelect()`.', warning: 'Las propiedades de salida de datos se calculan y no pueden ser establecidas directamente por una acción como `Set`.'},
      { id: 'cdc_7', text: 'Probar el Componente Aisladamente (Si es Posible)', details: 'Asegúrate de que funcione como se espera antes de integrarlo en múltiples pantallas.'},
      { id: 'cdc_8', text: 'Documentar el Componente', details: 'Añade descripciones a las propiedades personalizadas. Considera notas sobre cómo usarlo.'},
      { id: 'cdc_9', text: 'Considerar el Comportamiento Responsivo (Si Aplica)', details: 'Diseña el componente para que se adapte si se usará en diferentes tamaños de contenedor.'},
      { id: 'cdc_10', text: 'Optimizar el Rendimiento del Componente', details: 'Evita cálculos innecesarios o referencias a datos pesados dentro del componente si no son esenciales.'},
    ]
  },
  {
    id: 'power-automate-integration-checklist',
    title: 'Checklist para Integración con Power Automate',
    description: 'Buenas prácticas al llamar flujos de Power Automate desde Power Apps.',
    defaultExpanded: false,
    items: [
      { id: 'pai_1', text: 'Diseñar el Flujo para que sea Eficiente', details: 'Minimiza acciones, maneja errores dentro del flujo, y devuelve solo los datos necesarios a Power Apps.'},
      { id: 'pai_2', text: 'Usar "PowerApps (V2)" como Desencadenador (Trigger)', details: 'Permite definir tipos de datos de entrada más específicos desde Power Apps.', tip: 'Para devolver datos, usa la acción "Responder a una PowerApp o Flujo".'},
      { id: 'pai_3', text: 'Manejar Parámetros de Entrada en Power Apps', details: 'Asegúrate de pasar los parámetros correctos al llamar al flujo: `MyFlow.Run(param1, param2, ...)`.'},
      { id: 'pai_4', text: 'Manejar la Respuesta del Flujo en Power Apps', details: 'Si el flujo devuelve datos, asígnalos a una variable o colección. Ej: `Set(gblFlowResult, MyFlow.Run(...).resultproperty)`.', warning: 'Las propiedades de salida del flujo son sensibles a mayúsculas/minúsculas.'},
      { id: 'pai_5', text: 'Implementar Indicadores de Carga', details: 'Llamar a un flujo puede tomar tiempo. Muestra un spinner al usuario mientras el flujo se ejecuta.'},
      { id: 'pai_6', text: 'Manejo de Errores en la Llamada al Flujo', details: 'Considera usar IfError() o las propiedades OnFailure de los conectores para manejar posibles fallos en la ejecución del flujo.', code: `IfError(MyFlow.Run(param), Notify("Error en el flujo: " & FirstError.Message, NotificationType.Error))`},
      { id: 'pai_7', text: 'Probar el Flujo desde Power Apps Exhaustivamente', details: 'Prueba con diferentes entradas y escenarios, incluyendo casos de error.'},
      { id: 'pai_8', text: 'Versionado y Entornos', details: 'Sé consciente de las versiones del flujo y cómo se manejan en diferentes entornos (Desarrollo, Pruebas, Producción).'},
      { id: 'pai_9', text: 'Seguridad y Permisos del Flujo', details: 'Asegúrate de que los usuarios de la Power App tengan los permisos necesarios para ejecutar el flujo (o que el flujo use conexiones adecuadas).'},
      { id: 'pai_10', text: 'Limitar la Frecuencia de Llamadas', details: 'Evita llamar a flujos innecesariamente (ej. en bucles o propiedades que se recalculan constantemente) para no exceder límites de API.'},
    ]
  }
];