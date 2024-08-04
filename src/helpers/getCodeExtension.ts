export function getCodeExtension(lang : string = ""){
    lang = lang.toLowerCase();
    switch (lang) {
        case "c" : 
            return "c"
        case "c++" : 
            return "cpp"
        case "java" :
            return "java"
        case "javascript":
            return "js"
        case "dart" :
            return "dart"
        case "kotlin" :
            return "kotlin"
        case "html":
            return "html"
        case "matlab" :
            return "matlab"
        case "php" :
            return ".php"
        case "python" :
            return "py"
        case "rust" :
            return "rs"
        case "swift" :
            return "swift"
        case "typescript" :
            return "ts"
        default :
            return "txt"
    }
}