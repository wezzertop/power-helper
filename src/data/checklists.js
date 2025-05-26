// src/data/checklists.js
// Contiene las checklists para desarrollo en Power Apps.

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
  },
  {
    id: 'dataverse-integration-checklist',
    title: 'Checklist para Integración con Dataverse',
    description: 'Puntos clave para una integración efectiva y eficiente con Microsoft Dataverse.',
    defaultExpanded: false,
    items: [
      { id: 'dic_1', text: 'Diseño de Tablas y Columnas', details: 'Define claramente el esquema de datos en Dataverse. Usa los tipos de datos correctos. Establece relaciones entre tablas.', tip: 'Piensa en la escalabilidad y los requisitos de informes futuros.'},
      { id: 'dic_2', text: 'Seguridad de Datos (Roles y Permisos)', details: 'Configura roles de seguridad en Dataverse para controlar el acceso a tablas y columnas. Asigna usuarios a los roles apropiados.'},
      { id: 'dic_3', text: 'Uso de Vistas de Dataverse', details: 'Crea vistas en Dataverse para pre-filtrar y ordenar datos. Úsalas como origen de datos en Power Apps para mejorar el rendimiento y la delegación.', warning: 'Las vistas complejas pueden no ser completamente delegables.'},
      { id: 'dic_4', text: 'Fórmulas Delegables', details: 'Prioriza el uso de funciones y operadores delegables al consultar Dataverse para evitar el procesamiento local de grandes conjuntos de datos.'},
      { id: 'dic_5', text: 'Uso de Patch() para Escrituras', details: 'Utiliza Patch() para crear y actualizar registros en Dataverse. Es más flexible que SubmitForm() para lógica compleja.', tip: 'Para formularios simples, SubmitForm() sigue siendo una buena opción.'},
      { id: 'dic_6', text: 'Manejo de Columnas de Búsqueda (LookUp) y Elección (Choice)', details: 'Entiende cómo referenciar y actualizar estas columnas. A menudo implican trabajar con registros o valores específicos.', code: `// Ejemplo de Patch para una columna de búsqueda "Cliente"
Patch(Pedidos, Defaults(Pedidos), {NombrePedido: "Nuevo Pedido", Cliente: LookUp(Cuentas, 'Nombre de Cuenta' = "Cliente A")})`},
      { id: 'dic_7', text: 'Evitar N+1 Consultas en Galerías', details: 'Si necesitas datos relacionados en una galería, intenta usar AddColumns() con LookUp() de forma delegable o carga los datos relacionados en una colección para evitar múltiples consultas por cada ítem de la galería.'},
      { id: 'dic_8', text: 'Pruebas de Rendimiento con Volumen de Datos Realista', details: 'Prueba la aplicación con una cantidad de datos similar a la que se espera en producción.'},
      { id: 'dic_9', text: 'Uso de Flujos de Power Automate para Lógica Compleja del Lado del Servidor', details: 'Para operaciones complejas, validaciones avanzadas o integraciones que no son fácilmente delegables, considera usar un flujo.'},
      { id: 'dic_10', text: 'Entender las Capacidades de Dataverse (Calculated/Rollup Fields, Business Rules)', details: 'Aprovecha las funcionalidades nativas de Dataverse para lógica de negocio cuando sea posible.'},
    ]
  },
  {
    id: 'ui-ux-design-checklist',
    title: 'Checklist de Diseño UI/UX para Power Apps',
    description: 'Principios y consideraciones para crear interfaces de usuario efectivas y agradables.',
    defaultExpanded: false,
    items: [
      { id: 'ux_1', text: 'Entender al Usuario y sus Necesidades', details: '¿Quiénes son los usuarios? ¿Cuáles son sus objetivos y frustraciones? Diseña para ellos.'},
      { id: 'ux_2', text: 'Consistencia Visual', details: 'Usa colores, fuentes, iconos y estilos de botones de manera consistente en toda la aplicación.', tip: 'Crea un tema o usa componentes reutilizables.'},
      { id: 'ux_3', text: 'Navegación Clara e Intuitiva', details: 'Los usuarios deben saber dónde están, de dónde vienen y a dónde pueden ir. Usa menús claros, botones de retroceso y una jerarquía visual lógica.'},
      { id: 'ux_4', text: 'Feedback al Usuario', details: 'Proporciona retroalimentación para las acciones del usuario (ej. notificaciones de éxito/error, indicadores de carga, cambios de estado visual).'},
      { id: 'ux_5', text: 'Minimizar la Carga Cognitiva', details: 'No abrumes al usuario con demasiada información o demasiadas opciones a la vez. Agrupa la información lógicamente y usa espacios en blanco.'},
      { id: 'ux_6', text: 'Diseño Orientado a la Tarea', details: 'Facilita que los usuarios completen sus tareas principales de la forma más eficiente posible.'},
      { id: 'ux_7', text: 'Accesibilidad (A11Y)', details: 'Considera el contraste de color, el tamaño del texto, la navegación por teclado y las etiquetas para lectores de pantalla. Usa la herramienta "Comprobador de Accesibilidad".'},
      { id: 'ux_8', text: 'Diseño Responsivo (Si es Necesario)', details: 'Asegúrate de que la aplicación se vea y funcione bien en diferentes tamaños de pantalla y orientaciones.', warning: 'El diseño responsivo en Power Apps Canvas puede requerir planificación cuidadosa.'},
      { id: 'ux_9', text: 'Pruebas de Usabilidad', details: 'Observa a usuarios reales interactuando con tu aplicación para identificar puntos de fricción y áreas de mejora.'},
      { id: 'ux_10', text: 'Iteración y Mejora Continua', details: 'El diseño UI/UX no es un proceso de una sola vez. Recopila feedback y refina la interfaz continuamente.'},
    ]
  }
];