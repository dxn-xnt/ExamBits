import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\ExamController::generate
 * @see app/Http/Controllers/ExamController.php:23
 * @route '/exam-generator/generate'
 */
const generate99edf3a16904074f1533a5ca97d58055 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generate99edf3a16904074f1533a5ca97d58055.url(options),
    method: 'get',
})

generate99edf3a16904074f1533a5ca97d58055.definition = {
    methods: ["get","head"],
    url: '/exam-generator/generate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExamController::generate
 * @see app/Http/Controllers/ExamController.php:23
 * @route '/exam-generator/generate'
 */
generate99edf3a16904074f1533a5ca97d58055.url = (options?: RouteQueryOptions) => {
    return generate99edf3a16904074f1533a5ca97d58055.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExamController::generate
 * @see app/Http/Controllers/ExamController.php:23
 * @route '/exam-generator/generate'
 */
generate99edf3a16904074f1533a5ca97d58055.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generate99edf3a16904074f1533a5ca97d58055.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ExamController::generate
 * @see app/Http/Controllers/ExamController.php:23
 * @route '/exam-generator/generate'
 */
generate99edf3a16904074f1533a5ca97d58055.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generate99edf3a16904074f1533a5ca97d58055.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ExamController::generate
 * @see app/Http/Controllers/ExamController.php:23
 * @route '/exam-generator/generate'
 */
    const generate99edf3a16904074f1533a5ca97d58055Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: generate99edf3a16904074f1533a5ca97d58055.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ExamController::generate
 * @see app/Http/Controllers/ExamController.php:23
 * @route '/exam-generator/generate'
 */
        generate99edf3a16904074f1533a5ca97d58055Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generate99edf3a16904074f1533a5ca97d58055.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ExamController::generate
 * @see app/Http/Controllers/ExamController.php:23
 * @route '/exam-generator/generate'
 */
        generate99edf3a16904074f1533a5ca97d58055Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generate99edf3a16904074f1533a5ca97d58055.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    generate99edf3a16904074f1533a5ca97d58055.form = generate99edf3a16904074f1533a5ca97d58055Form
    /**
* @see \App\Http\Controllers\ExamController::generate
 * @see app/Http/Controllers/ExamController.php:23
 * @route '/exam-generator/generate'
 */
const generate99edf3a16904074f1533a5ca97d58055 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate99edf3a16904074f1533a5ca97d58055.url(options),
    method: 'post',
})

generate99edf3a16904074f1533a5ca97d58055.definition = {
    methods: ["post"],
    url: '/exam-generator/generate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ExamController::generate
 * @see app/Http/Controllers/ExamController.php:23
 * @route '/exam-generator/generate'
 */
generate99edf3a16904074f1533a5ca97d58055.url = (options?: RouteQueryOptions) => {
    return generate99edf3a16904074f1533a5ca97d58055.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExamController::generate
 * @see app/Http/Controllers/ExamController.php:23
 * @route '/exam-generator/generate'
 */
generate99edf3a16904074f1533a5ca97d58055.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate99edf3a16904074f1533a5ca97d58055.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ExamController::generate
 * @see app/Http/Controllers/ExamController.php:23
 * @route '/exam-generator/generate'
 */
    const generate99edf3a16904074f1533a5ca97d58055Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: generate99edf3a16904074f1533a5ca97d58055.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ExamController::generate
 * @see app/Http/Controllers/ExamController.php:23
 * @route '/exam-generator/generate'
 */
        generate99edf3a16904074f1533a5ca97d58055Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: generate99edf3a16904074f1533a5ca97d58055.url(options),
            method: 'post',
        })
    
    generate99edf3a16904074f1533a5ca97d58055.form = generate99edf3a16904074f1533a5ca97d58055Form

export const generate = {
    '/exam-generator/generate': generate99edf3a16904074f1533a5ca97d58055,
    '/exam-generator/generate': generate99edf3a16904074f1533a5ca97d58055,
}

/**
* @see \App\Http\Controllers\ExamController::view
 * @see app/Http/Controllers/ExamController.php:39
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
 * @see app/Http/Controllers/ExamController.php:39
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
 * @see app/Http/Controllers/ExamController.php:39
 * @route '/exam-generator/view/{examId}'
 */
view.get = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ExamController::view
 * @see app/Http/Controllers/ExamController.php:39
 * @route '/exam-generator/view/{examId}'
 */
view.head = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ExamController::view
 * @see app/Http/Controllers/ExamController.php:39
 * @route '/exam-generator/view/{examId}'
 */
    const viewForm = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: view.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ExamController::view
 * @see app/Http/Controllers/ExamController.php:39
 * @route '/exam-generator/view/{examId}'
 */
        viewForm.get = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: view.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ExamController::view
 * @see app/Http/Controllers/ExamController.php:39
 * @route '/exam-generator/view/{examId}'
 */
        viewForm.head = (args: { examId: string | number } | [examId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: view.url(args, {
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
const ExamController = { index, generate, view, exportMethod, export: exportMethod }

export default ExamController