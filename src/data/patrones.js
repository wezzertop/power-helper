// src/data/patrones.js
// Contiene los patrones de diseño y soluciones comunes en Power Apps.

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