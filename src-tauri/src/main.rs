#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// 当前window弹窗的label 默认是main 其他的看WebviewWindow的第一个参数取名
#[tauri::command]
fn my_custom_command(window: tauri::Window) {
    println!("Window: {}", window.label())
}

// 创建菜单
use tauri::{App, AppHandle, CustomMenuItem, Manager, Menu, MenuItem, Submenu};
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

// 创建托盘
fn create_tray_menu() -> tauri::SystemTray {
    // 创建menu
    // 这里 `"quit".to_string()` 定义菜单项 ID，第二个参数是菜单项标签。
    let quit = tauri::CustomMenuItem::new("quit".to_string(), "Quit");
    let toggle = tauri::CustomMenuItem::new("toggle".to_string(), "Toggle");
    let tray_menu = tauri::SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(tauri::SystemTrayMenuItem::Separator)
        .add_item(toggle);

    // 创建托盘并且插入menu
    let tray = tauri::SystemTray::new().with_menu(tray_menu);

    return tray;
}

fn notify(title: &str, body: &str, app_handle: &tauri::AppHandle) {
    tauri::api::notification::Notification::new("托盘系统消息")
        .title(title)
        .body(body)
        .notify(app_handle)
        .unwrap()
}

// 托盘内的事件
fn tray_menu_event(app_handle: &tauri::AppHandle, event: tauri::SystemTrayEvent) {
    match event {
        tauri::SystemTrayEvent::LeftClick {
            // tray_id,
            // position,
            // size,
            ..
        } => {
            println!("左击");
            match app_handle.get_window("main") {
                None => {
                    println!("not found main window");

                    notify(
                        "托盘事件",
                        "左击了图标，没有发现main窗体，进行了创建",
                        app_handle,
                    );
                    // 当不存在时，就创建主体窗口
                    tauri::WindowBuilder::new(
                        app_handle,
                        "main",
                        tauri::WindowUrl::App("/#/".parse().unwrap()),
                    )
                    .build()
                    .expect("failed to build main window");
                }
                Some(window) => {
                    if !window.is_visible().unwrap() {
                        notify("托盘事件", "左击了图标显示了main窗体", app_handle);
                        window.show().unwrap();
                    }
                }
            }
        }
        tauri::SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => {
                std::process::exit(0);
            }
            "toggle" => {
                let item_handle = app_handle.tray_handle().get_item(&id);
                match app_handle.get_window("main") {
                    None => {
                        println!("not found main window");
                        tauri::WindowBuilder::new(
                            app_handle,
                            "main",
                            tauri::WindowUrl::App("/#/".parse().unwrap()),
                        )
                        .build()
                        .expect("failed to build main window");
                    }
                    Some(window) => {
                        if window.is_visible().unwrap() {
                            window.hide().unwrap();
                            item_handle.set_title("toggle main!!").unwrap();
                        } else {
                            window.show().unwrap();
                            item_handle.set_title("toggle main!!").unwrap();
                        }
                    }
                }
            }
            _ => {}
        },
        _ => {}
    }
}

fn main() {
    // 菜单
    let menu = create_menu();

    tauri::Builder::default()
        .menu(menu)
        .system_tray(create_tray_menu())
        .on_system_tray_event(|app, event| tray_menu_event(app, event))
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
