var ComponentPublish = React.createClass({
    componentDidMount: function() {

    },
    componentWillUnmount: function() {
      
    },
    // This was the key fix --- stop events from bubbling
    handleClick: function(e) {
        e.stopPropagation();
    },
    render: function() {

        return (
            <div className="modal fade" role="dialog" aria-hidden="true">
                this is a modal
            </div>
        );
    }
});