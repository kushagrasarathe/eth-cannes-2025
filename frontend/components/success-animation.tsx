'use client';

const SuccessAnimation = () => {
    return (
        <div className="fixed inset-0 rounded-3xl bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="success-checkmark">
                <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                </div>
            </div>
            <style jsx>{`
                .success-checkmark {
                    width: 80px;
                    height: 115px;
                    margin: 0 auto;
                }
                
                .check-icon {
                    width: 80px;
                    height: 80px;
                    position: relative;
                    border-radius: 50%;
                    box-sizing: content-box;
                    border: 4px solid #4CAF50;
                    background: #fff;
                }
                
                .icon-line {
                    height: 5px;
                    background-color: #4CAF50;
                    display: block;
                    border-radius: 2px;
                    position: absolute;
                    z-index: 10;
                }
                
                .icon-line.line-tip {
                    top: 46px;
                    left: 14px;
                    width: 25px;
                    transform: rotate(45deg);
                    animation: icon-line-tip 0.75s;
                }
                
                .icon-line.line-long {
                    top: 38px;
                    right: 8px;
                    width: 47px;
                    transform: rotate(-45deg);
                    animation: icon-line-long 0.75s;
                }
                
                .icon-circle {
                    top: -4px;
                    left: -4px;
                    z-index: 10;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    position: absolute;
                    box-sizing: content-box;
                    border: 4px solid rgba(76, 175, 80, .5);
                }
                
                @keyframes icon-line-tip {
                    0% {
                        width: 0;
                        left: 1px;
                        top: 19px;
                    }
                    54% {
                        width: 0;
                        left: 1px;
                        top: 19px;
                    }
                    70% {
                        width: 50px;
                        left: -8px;
                        top: 37px;
                    }
                    84% {
                        width: 17px;
                        left: 21px;
                        top: 48px;
                    }
                    100% {
                        width: 25px;
                        left: 14px;
                        top: 45px;
                    }
                }

                @keyframes icon-line-long {
                    0% {
                        width: 0;
                        right: 46px;
                        top: 54px;
                    }
                    65% {
                        width: 0;
                        right: 46px;
                        top: 54px;
                    }
                    84% {
                        width: 55px;
                        right: 0px;
                        top: 35px;
                    }
                    100% {
                        width: 47px;
                        right: 8px;
                        top: 38px;
                    }
                }
            `}</style>
        </div>
    );
};

export default SuccessAnimation; 