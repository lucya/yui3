YUI.add('button-group-test', function (Y) {

    var Assert      = Y.Assert,
        ArrayAssert = Y.ArrayAssert,
        suite;
        
    suite = new Y.Test.Suite('ButtonGroup');

    // -- Creation ----------------------------------------------------------------
    suite.add(new Y.Test.Case({
        name: 'Methods',

        setUp : function () {
            Y.one("#container").setContent('<div id="group"><button>A</button><button>B</button><button>C</button></div>');
            this.ButtonGroup = new Y.ButtonGroup({
                srcNode: '#group'
            }).render();
        },
    
        tearDown: function () {
            Y.one('#container').empty(true);
        },
    
        'ButtonGroup.getButtons() should return an array of Y.Node instances': function () {
            var ButtonGroup = this.ButtonGroup;
            var buttons = ButtonGroup.getButtons();
        
            Assert.isInstanceOf(Y.Node, buttons.item(0));
        }
    }));

    // -- Checkbox Group ----------------------------------------------------------------
    suite.add(new Y.Test.Case({
        name: 'Methods',

        setUp : function () {
            Y.one("#container").setContent('<div id="group"><button>A</button><button>B</button><button>C</button></div>');
            this.ButtonGroup = new Y.ButtonGroup({
                srcNode: '#group',
                type: 'checkbox'
            }).render();
        },
    
        tearDown: function () {
            Y.one('#container').empty(true);
        },
    
        'ButtonGroup.getSelectedButtons() should return accurate counts of selected buttons': function () {
            var ButtonGroup = this.ButtonGroup;
            var buttons = ButtonGroup.getButtons();
        
            // Ensure no buttons are selected
            Assert.areSame(0, ButtonGroup.getSelectedButtons().length);

            // Select specific buttons, and make sure the selected array jives
            buttons.item(0).simulate('click');
            Assert.areSame(1, ButtonGroup.getSelectedButtons().length);
            
            buttons.item(1).simulate('click');
            Assert.areSame(2, ButtonGroup.getSelectedButtons().length);
        
            buttons.item(2).simulate('click');
            Assert.areSame(3, ButtonGroup.getSelectedButtons().length);
        
            // Unselect
            buttons.item(1).simulate('click');
            Assert.areSame(2, ButtonGroup.getSelectedButtons().length);
        },
    

        'ButtonGroup.getSelectedValues() should return values of selected buttons': function () {
            var ButtonGroup = this.ButtonGroup;
            var buttons = ButtonGroup.getButtons();
        
            // Ensure no buttons are selected
            Assert.areSame(0, ButtonGroup.getSelectedButtons().length);
        
            // Select some buttons and ensure the array of values matches
            buttons.item(0).simulate('click');
            ArrayAssert.itemsAreEqual(['A'], ButtonGroup.getSelectedValues());
        
            buttons.item(2).simulate('click');
            ArrayAssert.itemsAreEqual(['A', 'C'], ButtonGroup.getSelectedValues());
        
            buttons.item(1).simulate('click');
            ArrayAssert.itemsAreEqual(['A', 'B', 'C'], ButtonGroup.getSelectedValues());
        
            // Unselect
            buttons.item(1).simulate('click');
            ArrayAssert.itemsAreEqual(['A', 'C'], ButtonGroup.getSelectedValues());
        },
        
        'Selecting a button should trigger selectionChange': function () {
            var ButtonGroup = this.ButtonGroup;
            var buttons = ButtonGroup.getButtons();
            var eventsTriggered = 0;

            ButtonGroup.on('selectionChange', function(){
                eventsTriggered+=1;
            });

            Assert.areEqual(0, eventsTriggered);
            
            buttons.item(0).simulate('click');
            Assert.areEqual(1, eventsTriggered);
            
            buttons.item(1).simulate('click');
            Assert.areEqual(2, eventsTriggered);
            
            buttons.item(1).simulate('click');
            Assert.areEqual(3, eventsTriggered);
        },
        
        'Selecting a button in a group should provide an originEvent': function () {
            var ButtonGroup = this.ButtonGroup;
            var buttons = ButtonGroup.getButtons();
            
            ButtonGroup.on('selectionChange', function(e){
                Assert.areSame(buttons.item(0).get('text'), e.originEvent.target.get('text'));
            });
            
            buttons.item(0).simulate('click');
        }
    }));

    // -- Radio Group ----------------------------------------------------------------
    suite.add(new Y.Test.Case({
        name: 'Methods',

        setUp : function () {
            Y.one("#container").setContent('<div id="group"><button>A</button><button>B</button><button>C</button></div>');
            this.ButtonGroup = new Y.ButtonGroup({
                srcNode: '#group',
                type: 'radio'
            }).render();
        },
    
        tearDown: function () {
            Y.one('#container').empty(true);
        },
    
        'ButtonGroup.getSelectedButtons() should return accurate counts of selected buttons': function () {
            var ButtonGroup = this.ButtonGroup;
            var buttons = ButtonGroup.getButtons();
        
            // Ensure no buttons are selected
            Assert.areSame(0, ButtonGroup.getSelectedButtons().length);

            // Select specific buttons, and make sure the selected array jives
            buttons.item(0).simulate('click');
            Assert.areSame(1, ButtonGroup.getSelectedButtons().length);
            
            buttons.item(1).simulate('click');
            Assert.areSame(1, ButtonGroup.getSelectedButtons().length);
        
            buttons.item(2).simulate('click');
            Assert.areSame(1, ButtonGroup.getSelectedButtons().length);
        }
    }));
    
    Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['button-group', 'test', 'node-event-simulate']
});
