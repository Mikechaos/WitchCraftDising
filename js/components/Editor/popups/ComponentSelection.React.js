var ModalPayload = React.createClass({
    componentDidMount: function() {
        // These can be configured via options; this is just a demo
        $(this.getDOMNode()).modal({background: true, keyboard: true, show: false});
    },
 
    componentWillUnmount: function() {
        $(this.getDOMNode()).off('hidden', this.handleHidden);
    },
    render: getDefaultProps() {
        return {Header: React.DOM.div, Body: React.DOM.div, Footer: React.DOM.div};
    }
    render: function() {
        var Header = this.props.header;
        var Body = this.props.body;
        var Footer = this.props.footer;
        return (
            <div className="modal fade" role="dialog" aria-hidden="true" data-modalID={this.props.modalID}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <Header className="modal-header"/>
                        <Body className="modal-body"/>
                        <Footer className="modal-footer"/>
                    </div>
                </div>
            </div>
        );
    }
});