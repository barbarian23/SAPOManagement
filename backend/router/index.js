export function router(app){
    app.use("/api/user", require('./user/user.router').default);

    app.use("/api/product", require('./product/product.router').default);

    app.all("/*", require('./render/render.router').default);
    //app.use(["/login","/home"], require('./render/render.router').default);
}