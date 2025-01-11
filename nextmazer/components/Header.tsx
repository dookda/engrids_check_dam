export default function Header() {
    return (
        <div className="container-fluid mt-4 mb-4">
            <div className="row">
                <div className="col-sm-8 order-1 order-first">
                    <h3>ปักหมุดฝาย</h3>
                    <p className="text-subtitle text-muted">บันทึกข้อมูลฝาย</p>
                </div>
                <div className="col-sm-4 order-2 order-last">
                    <div className="d-flex">
                        <div className="avatar avatar-lg">
                            <img src="https://profile.line-scdn.net/0hjiX1ge8gNUZ1SBrAnfNLOQUYNixWOWxUWi8vIUVIaX9NeSVEDntyKBJIbyYbeXFFX3lyJkJLP3N5W0Igax7JcnJ4aHdJf3MWWip9qA" />
                        </div>
                        <div className="name ">
                            <h5 className="mb-1">Hank</h5>
                            <h6 className="text-muted mb-0">@johnducky</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}