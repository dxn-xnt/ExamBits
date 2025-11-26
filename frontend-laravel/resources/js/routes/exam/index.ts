import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ExamController::index
* @see app/Http/Controllers/ExamController.php:15
* @route '/exam-generator'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/exam-generator',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExamController::index
* @see app/Http/Controllers/ExamController.php:15
* @route '/exam-generator'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExamController::index
* @see app/Http/Controllers/ExamController.php:15
* @route '/exam-generator'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExamController::index
* @see app/Http/Controllers/ExamController.php:15
* @route '/exam-generator'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ExamController::index
* @see app/Http/Controllers/ExamController.php:15
* @route '/exam-generator'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExamController::index
* @see app/Http/Controllers/ExamController.php:15
* @route '/exam-generator'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExamController::index
* @see app/Http/Controllers/ExamController.php:15
* @route '/exam-generator'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\ExamController::generateForm
* @see app/Http/Controllers/ExamController.php:23
* @route '/exam-generator/generate'
*/
export const generateForm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateForm.url(options),
    method: 'get',
})

generateForm.definition = {
    methods: ["get","head"],
    url: '/exam-generator/generate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExamController::generateForm
* @see app/Http/Controllers/ExamController.php:23
* @route '/exam-generator/generate'
*/
generateForm.url = (options?: RouteQueryOptions) => {




    return generateForm.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExamController::generateForm
* @see app/Http/Controllers/ExamController.php:23
* @route '/exam-generator/generate'
*/
generateForm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateForm.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExamController::generateForm
* @see app/Http/Controllers/ExamController.php:23
* @route '/exam-generator/generate'
*/
generateForm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateForm.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ExamController::generateForm
* @see app/Http/Controllers/ExamController.php:23
* @route '/exam-generator/generate'
*/
const generateFormForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: generateForm.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExamController::generateForm
* @see app/Http/Controllers/ExamController.php:23
* @route '/exam-generator/generate'
*/
generateFormForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: generateForm.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExamController::generateForm
* @see app/Http/Controllers/ExamController.php:23
* @route '/exam-generator/generate'
*/
generateFormForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: generateForm.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

generateForm.form = generateFormForm

/**
* @see \App\Http\Controllers\ExamController::generateExam
* @see app/Http/Controllers/ExamController.php:23
* @route '/exam-generator/generate'
*/
export const generateExam = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateExam.url(options),
    method: 'post',
})

generateExam.definition = {
    methods: ["post"],
    url: '/exam-generator/generate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ExamController::generateExam
* @see app/Http/Controllers/ExamController.php:23
* @route '/exam-generator/generate'
*/
generateExam.url = (options?: RouteQueryOptions) => {




    return generateExam.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExamController::generateExam
* @see app/Http/Controllers/ExamController.php:23
* @route '/exam-generator/generate'
*/
generateExam.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateExam.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ExamController::generateExam
* @see app/Http/Controllers/ExamController.php:23
* @route '/exam-generator/generate'
*/
const generateExamForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generateExam.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ExamController::generateExam
* @see app/Http/Controllers/ExamController.php:23
* @route '/exam-generator/generate'
*/
generateExamForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generateExam.url(options),
    method: 'post',
})

generateExam.form = generateExamForm

/**
* @see \App\Http\Controllers\ExamController::view
* @see app/Http/Controllers/ExamController.php:39
* @route '/exam-generator/view/id'
*/
export const view = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(options),
    method: 'get',
})

view.definition = {
    methods: ["get","head"],
    url: '/exam-generator/view/id',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExamController::view
* @see app/Http/Controllers/ExamController.php:39
* @route '/exam-generator/view/id'
*/
view.url = (options?: RouteQueryOptions) => {




    return view.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExamController::view
* @see app/Http/Controllers/ExamController.php:39
* @route '/exam-generator/view/id'
*/
view.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExamController::view
* @see app/Http/Controllers/ExamController.php:39
* @route '/exam-generator/view/id'
*/
view.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ExamController::view
* @see app/Http/Controllers/ExamController.php:39
* @route '/exam-generator/view/id'
*/
const viewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: view.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExamController::view
* @see app/Http/Controllers/ExamController.php:39
* @route '/exam-generator/view/id'
*/
viewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: view.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExamController::view
* @see app/Http/Controllers/ExamController.php:39
* @route '/exam-generator/view/id'
*/
viewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: view.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

view.form = viewForm

/**
* @see \App\Http\Controllers\ExamController::exportMethod
* @see app/Http/Controllers/ExamController.php:54
* @route '/exam-generator/export/{examId}'
*/
export const exportMethod = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/exam-generator/export/{examId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExamController::exportMethod
* @see app/Http/Controllers/ExamController.php:54
* @route '/exam-generator/export/{examId}'
*/
exportMethod.url = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { examId: args }
    }


    if (Array.isArray(args)) {
        args = {
            examId: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        examId: args.examId,
    }

    return exportMethod.definition.url
            .replace('{examId}', parsedArgs.examId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExamController::exportMethod
* @see app/Http/Controllers/ExamController.php:54
* @route '/exam-generator/export/{examId}'
*/
exportMethod.get = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExamController::exportMethod
* @see app/Http/Controllers/ExamController.php:54
* @route '/exam-generator/export/{examId}'
*/
exportMethod.head = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ExamController::exportMethod
* @see app/Http/Controllers/ExamController.php:54
* @route '/exam-generator/export/{examId}'
*/
const exportMethodForm = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExamController::exportMethod
* @see app/Http/Controllers/ExamController.php:54
* @route '/exam-generator/export/{examId}'
*/
exportMethodForm.get = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExamController::exportMethod
* @see app/Http/Controllers/ExamController.php:54
* @route '/exam-generator/export/{examId}'
*/
exportMethodForm.head = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportMethod.form = exportMethodForm



const exam = {
    index: Object.assign(index, index),
    generateForm: Object.assign(generateForm, generateForm),
    generateExam: Object.assign(generateExam, generateExam),
    view: Object.assign(view, view),
    export: Object.assign(exportMethod, exportMethod),
}

export default exam