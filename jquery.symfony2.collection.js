(function( $ ){

    var methods = {
        init : function( options ){
            var $this = this;

            if ( this[0] == undefined ){
                return;
            }

            this.data('sfsettings', $.extend({
                collectionHolder: $this,
                addButton: $('<a href="#" class="add-collection-item">Add</a>'),
                deleteButton: $('<a href="#" class="delete-collection-item">Delete</a>'),
                name: '[Element Name]'
            }, options));


            this.data('sfsettings').collectionHolder.children('div').each(function() {
                methods.addDeleteLink.apply($this, [$(this)]);
            });

            this.data('sfsettings').addButton.on('click', function(e){
                e.preventDefault();
                // add a new tag form (see next code block)
                methods.add.apply($this);
            });

            this.data('sfsettings').collectionHolder.append(this.data('sfsettings').addButton);

        },

        addDeleteLink : function($element){
            var $removeFormA = this.data('sfsettings').deleteButton.clone();
            var $this = this;
            $element.append($removeFormA);

            $removeFormA.on('click', function(e) {
                // prevent the link from creating a "#" on the URL
                e.preventDefault();

                if ( typeof $this.data('sfsettings').onDelete === 'function' ){
                    $this.data('sfsettings').onDelete($element);
                }
                // remove the li for the tag form
                $element.remove();

            });
        },


        add : function(){
            // Get the data-prototype we explained earlier
            var collectionHolder = this.data('sfsettings').collectionHolder;
            var addButton = this.data('sfsettings').addButton;

            var prototype = this.data('sfsettings').collectionHolder.attr('data-prototype');

            // Replace '__name__' in the prototype's HTML to
            // instead be a number based on the current collection's length.
            var newForm = prototype.replace(/__name__label__/g, name + collectionHolder.children().length);
            newForm = newForm.replace( /__name__/g, collectionHolder.children().length );
            newForm = $( newForm );
            newForm.addClass('collection-child');

            methods.addDeleteLink.apply( this, [newForm] );

            addButton.before(newForm);

            if ( typeof this.data('sfsettings').onAdd === 'function' ){
                this.data('sfsettings').onAdd(newForm);
            }
        }

    }

    $.fn.collection = function( method ){
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.symfony' );
        }

        return this;
    };

})( jQuery );
