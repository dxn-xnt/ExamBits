import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ExamController::index
* @see app/Http/Controllers/ExamController.php:14
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
* @see app/Http/Controllers/ExamController.php:14
* @route '/exam-generator'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExamController::index
* @see app/Http/Controllers/ExamController.php:14
* @route '/exam-generator'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExamController::index
* @see app/Http/Controllers/ExamController.php:14
* @route '/exam-generator'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})


/**
* @see \App\Http\Controllers\ExamController::generate
* @see app/Http/Controllers/ExamController.php:0
* @route '/exam-generator/generate'
*/
export const generate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: '/exam-generator/generate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ExamController::generate
* @see app/Http/Controllers/ExamController.php:0
* @route '/exam-generator/generate'
*/
generate.url = (options?: RouteQueryOptions) => {




    return generate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExamController::generate
* @see app/Http/Controllers/ExamController.php:0
* @route '/exam-generator/generate'
*/
generate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})


/**
* @see \App\Http\Controllers\ExamController::view
* @see app/Http/Controllers/ExamController.php:0
* @route '/exam-generator/view/{examId}'
*/
export const view = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

view.definition = {
    methods: ["get","head"],
    url: '/exam-generator/view/{examId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExamController::view
* @see app/Http/Controllers/ExamController.php:0
* @route '/exam-generator/view/{examId}'
*/
view.url = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return view.definition.url
            .replace('{examId}', parsedArgs.examId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExamController::view
* @see app/Http/Controllers/ExamController.php:0
* @route '/exam-generator/view/{examId}'
*/
view.get = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExamController::view
* @see app/Http/Controllers/ExamController.php:0
* @route '/exam-generator/view/{examId}'
*/
view.head = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view.url(args, options),
    method: 'head',
})


/**
* @see \App\Http\Controllers\ExamController::exportMethod
* @see app/Http/Controllers/ExamController.php:0
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
* @see app/Http/Controllers/ExamController.php:0
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
* @see app/Http/Controllers/ExamController.php:0
* @route '/exam-generator/export/{examId}'
*/
exportMethod.get = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ExamController::exportMethod
* @see app/Http/Controllers/ExamController.php:0
* @route '/exam-generator/export/{examId}'
*/
exportMethod.head = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(args, options),
    method: 'head',
})




const exam = {
    index: Object.assign(index, index),
    generate: Object.assign(generate, generate),
    view: Object.assign(view, view),
    export: Object.assign(exportMethod, exportMethod),
}

export default exam