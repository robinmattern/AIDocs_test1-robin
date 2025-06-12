#!/bin/bash

# Function to check if Ollama is installed
check_ollama_installed() {
    if ! command -v ollama &> /dev/null; then
        echo "❌ Ollama is not installed on this system."
        echo "Please install Ollama from https://ollama.com before running this script."
        exit 1
    else
        echo "✅ Ollama is installed."
    fi
}

# Function to pull a model (whether it's already installed or not)
pull_model() {
    local model=$1
    
    echo "🔄 Pulling model: $model"
    ollama pull $model
    if [ $? -eq 0 ]; then
        echo "✅ Successfully pulled/updated $model."
    else
        echo "❌ Failed to pull $model."
    fi
    echo "----------------------------------------"
}

# Main script
echo "==== Ollama Model Setup Script ===="
echo "Checking if Ollama is installed..."
check_ollama_installed

echo "Pulling all required models (will update if already installed)..."

# List of models to pull
models=(
    "qwen2:0.5b"
    "qwen2:1.5b"
    "gemma2:2b"
    "gemma2:2b-instruct-q4_0"
    "gemma3:1b"
    "gemma3:1b-it-q4_K_M"
    "gemma3:4b"
    "granite3.3:2b"
    "granite3.3:8b"
    "internlm2:latest"
    "llama3.1:8b"
    "llama3.2:3b"
    "mistral:7b"
    "mistral:7b-instruct"
    "nomic-embed-text"
    "phi4-mini"
    "phi4-mini:3.8b-q4_K_M"
)

# Pull each model
for model in "${models[@]}"; do
    pull_model "$model"
done

echo "==== Model updates complete! ===="
