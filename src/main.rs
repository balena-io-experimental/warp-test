#[tokio::main]
async fn main() {
    pretty_env_logger::init();

    warp::serve(warp::fs::dir("./ui"))
        .run(([127, 0, 0, 1], 3030))
        .await;
}
