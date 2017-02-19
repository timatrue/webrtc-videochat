/**
 * Created by artem on 18/02/2017.
 */
window.mainrtc.UI = (function(){

    function initInterface(){
        var self = this;
        self.userLoginInput = document.getElementById("userLoginInput");
        self.userLoginBtn = document.getElementById("userLoginBtn");
        self.userNameRemoteInput = document.getElementById("userNameRemoteInput");
        self.userCallRemoteBtn = document.getElementById("userCallRemoteBtn");
        self.userHangUpBtn = document.getElementById("userHangUpBtn");
        document.querySelector("#userDoSelfieBtn").addEventListener("click", userScreenShotHandler);
        listenersUI.call(this);
    }

    function listenersUI(){
        this.userLoginBtn.addEventListener('click', userLoginHandler.bind(this));
        this.userCallRemoteBtn.addEventListener('click', userCallHandler.bind(this));
        this.userHangUpBtn.addEventListener('click', userHangUpHandler);
    }
    function userLoginHandler(){
        userLogin = this.userLoginInput.value;
        var inputCorrect = mainrtc.socketTool.isInputCorrect(userLogin);
        if(inputCorrect) send(JSON.stringify({type: "login", name: userLogin}));
        else console.log("error user login");
    }
    function userCallHandler(){
        var userNameRemote = this.userNameRemoteInput.value;
        var inputCorrect = mainrtc.socketTool.isInputCorrect(userNameRemote);
        if(inputCorrect) mainrtc.connectionP2P.startPeerConnection(userNameRemote);
        else console.log("error remote user name");
    }
    function userHangUpHandler(){
        send(JSON.stringify({type: "leave", name: userLogin}));
        mainrtc.connectionP2P.onLeave();
    }
    function userScreenShotHandler(event){
        mainrtc.frontOptions.screenShot();
    }

    return {
        'initInterface' : initInterface
    }

})();