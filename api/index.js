import app from "../index"

load('public/controllers')
.then('public/routes')
.into(app)

export default app