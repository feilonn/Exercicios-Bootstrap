import $ from 'jquery'

const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback)
    }
}

function loadIncludes(parent) {
    if(!parent) {
        parent = 'body'
    }

    $(parent).find('[wm-include]').each(function(i, e) {
        //pega valor do atributo wm-include
        const url = $(e).attr('wm-include')
        //Requisição da url via ajax
        $.ajax({
            url,
            //Após o carregamento da url, irá executar a callback success()
            success(data) {
                $(e).html(data)
                $(e).removeAttr('wm-include')

                loadHtmlSuccessCallbacks.forEach(callback => callback(data))
                //chamada recursiva
                loadIncludes(e)
            }
        })
    })
}

loadIncludes()