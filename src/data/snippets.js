// src/data/snippets.js
// Contiene los snippets de código de Power Fx para la aplicación.

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
    },
    {
        id: 'snippet8',
        title: 'Obtener Primer Día del Mes Actual',
        description: 'Calcula el primer día del mes actual.',
        code: 'Date(Year(Today()), Month(Today()), 1)',
        tags: ['fecha', 'cálculo', 'mes'],
        language: 'powerfx'
    },
    {
        id: 'snippet9',
        title: 'Obtener Último Día del Mes Actual',
        description: 'Calcula el último día del mes actual.',
        code: 'DateAdd(Date(Year(Today()), Month(Today()) + 1, 1), -1, Days)',
        tags: ['fecha', 'cálculo', 'mes'],
        language: 'powerfx'
    },
    {
        id: 'snippet10',
        title: 'Mostrar/Ocultar Contraseña (Toggle)',
        description: 'Alterna la visibilidad de una contraseña en un campo de texto.',
        code: `// En la propiedad "Mode" de un TextInput:
If(locShowPassword, TextMode.SingleLine, TextMode.Password)

// En el OnSelect de un icono para alternar:
UpdateContext({ locShowPassword: !locShowPassword })`,
        tags: ['ui', 'contraseña', 'formulario', 'toggle'],
        language: 'powerfx'
    }
];