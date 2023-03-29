#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// 发送和接收信息
// #[tauri::command]
// fn my_custom_command(invoke_message: String) -> String {
//     // println!("I was invoked from JS!{}", invoke_message)
//     Ok("rust return!".into())
// }

// 当前window弹窗的label 默认是main 其他的看WebviewWindow的第一个参数取名
#[tauri::command]
fn my_custom_command(window: tauri::Window) {
    println!("Window: {}", window.label())
}

// 注册指令，【有问题】
// #[tauri::command]
// async fn my_custom_command(app_handle: tauri::AppHandle, window: tauri::Window) {
//     use tauri::GlobalShortcutManager;

//     app_handle
//         .global_shortcut_manager()
//         .register("CTRL + U", move || {
//             window.emit(
//                 "alert",
//                 json!({
//                     "message":"hello"
//                 }),
//             );
//         })
//         .unwrap()
// }

// 创建菜单
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};
fn create_menu() -> Menu {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
    let menu = Menu::new()
        .add_native_item(MenuItem::Copy)
        .add_item(CustomMenuItem::new("newWindow", "newWindow"))
        .add_item(CustomMenuItem::new("hide", "Hide"))
        .add_submenu(submenu);

    return menu;
}

fn main() {
    let menu = create_menu();

    tauri::Builder::default()
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "quit" => {
                std::process::exit(0);
            }
            "close" => event.window().close().unwrap(),
            "newWindow" => {
                tauri::WindowBuilder::new(
                    event.window(),
                    "new_window",
                    tauri::WindowUrl::App("/#/new1".parse().unwrap()),
                )
                .build()
                .expect("failed to build window");
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![greet, my_custom_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
