use warp::Filter;

use serde_derive::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
struct Entry {
    name: String,
    count: u32,
}

#[tokio::main]
async fn main() {
    pretty_env_logger::init();

    let api = warp::post()
        .and(warp::path("api"))
        .and(warp::path("connect"))
        .and(warp::body::json())
        .map(|mut entry: Entry| {
            entry.count *= 10;
            warp::reply::json(&entry)
        });

    let ui = warp::fs::dir("./ui");

    let routes = api.or(ui);

    warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;
}
