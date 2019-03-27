pragma solidity 0.5.0;

library SampleLib {

    struct SampleStruct{
        bool state;
        address sender;
    }

    function create(
        SampleStruct storage _self,
        address _sender,
        bool _state
    )
        public
    {
        _self.state = _state;
        _self.sender = _sender;
    }
}