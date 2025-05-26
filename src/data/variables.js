// src/data/variables.js
// Contiene la información sobre variables en Power Fx.

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
        code: `Navigate(
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