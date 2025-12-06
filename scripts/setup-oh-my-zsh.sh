#!/bin/bash

# oh-my-zsh Setup Script for WSL
# This script installs and configures oh-my-zsh with recommended plugins

set -e  # Exit on error

echo "🚀 Setting up oh-my-zsh in WSL..."
echo ""

# Check if running in WSL
if [ ! -f /proc/version ] || ! grep -qi microsoft /proc/version; then
    echo "⚠️  Warning: This script is designed for WSL. Continuing anyway..."
    echo ""
fi

# Check if zsh is installed
if ! command -v zsh &> /dev/null; then
    echo "📦 Installing zsh..."
    sudo apt update
    sudo apt install zsh -y
    echo "✅ zsh installed successfully"
else
    echo "✅ zsh is already installed"
fi
echo ""

# Check if oh-my-zsh is already installed
if [ -d "$HOME/.oh-my-zsh" ]; then
    echo "⚠️  oh-my-zsh is already installed at $HOME/.oh-my-zsh"
    read -p "Do you want to reinstall? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Skipping oh-my-zsh installation..."
    else
        echo "Removing existing installation..."
        rm -rf "$HOME/.oh-my-zsh"
        echo "Installing oh-my-zsh..."
        sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
        echo "✅ oh-my-zsh installed successfully"
    fi
else
    echo "📦 Installing oh-my-zsh..."
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
    echo "✅ oh-my-zsh installed successfully"
fi
echo ""

# Install Powerlevel10k theme
if [ ! -d "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k" ]; then
    echo "🎨 Installing Powerlevel10k theme..."
    git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
    echo "✅ Powerlevel10k theme installed"
else
    echo "✅ Powerlevel10k theme already installed"
fi
echo ""

# Install zsh-autosuggestions plugin
if [ ! -d "${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions" ]; then
    echo "🔌 Installing zsh-autosuggestions plugin..."
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
    echo "✅ zsh-autosuggestions plugin installed"
else
    echo "✅ zsh-autosuggestions plugin already installed"
fi
echo ""

# Install zsh-syntax-highlighting plugin
if [ ! -d "${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting" ]; then
    echo "🔌 Installing zsh-syntax-highlighting plugin..."
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
    echo "✅ zsh-syntax-highlighting plugin installed"
else
    echo "✅ zsh-syntax-highlighting plugin already installed"
fi
echo ""

# Configure .zshrc
echo "⚙️  Configuring .zshrc..."
ZSH_RC="$HOME/.zshrc"

# Backup existing .zshrc if it exists
if [ -f "$ZSH_RC" ]; then
    cp "$ZSH_RC" "$ZSH_RC.backup.$(date +%Y%m%d_%H%M%S)"
    echo "📋 Backed up existing .zshrc"
fi

# Update theme to powerlevel10k
if grep -q "ZSH_THEME=" "$ZSH_RC" 2>/dev/null; then
    sed -i 's/^ZSH_THEME=.*/ZSH_THEME="powerlevel10k\/powerlevel10k"/' "$ZSH_RC"
else
    echo 'ZSH_THEME="powerlevel10k/powerlevel10k"' >> "$ZSH_RC"
fi

# Update plugins
if grep -q "plugins=(" "$ZSH_RC" 2>/dev/null; then
    # Check if plugins are already configured
    if ! grep -q "zsh-autosuggestions\|zsh-syntax-highlighting" "$ZSH_RC"; then
        sed -i 's/^plugins=(\(.*\))/plugins=(\1 zsh-autosuggestions zsh-syntax-highlighting)/' "$ZSH_RC"
    fi
else
    echo 'plugins=(git zsh-autosuggestions zsh-syntax-highlighting)' >> "$ZSH_RC"
fi

echo "✅ .zshrc configured"
echo ""

# Set zsh as default shell
CURRENT_SHELL=$(basename "$SHELL")
if [ "$CURRENT_SHELL" != "zsh" ]; then
    echo "🔄 Setting zsh as default shell..."
    ZSH_PATH=$(which zsh)
    if [ -n "$ZSH_PATH" ]; then
        chsh -s "$ZSH_PATH"
        echo "✅ zsh set as default shell"
        echo "⚠️  You may need to restart your terminal for changes to take effect"
    else
        echo "❌ Could not find zsh path"
    fi
else
    echo "✅ zsh is already your default shell"
fi
echo ""

echo "🎉 Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Restart your WSL terminal or run: exec zsh"
echo "   2. If using Powerlevel10k, run: p10k configure (optional)"
echo "   3. Your .zshrc backup is saved as: $ZSH_RC.backup.*"
echo ""
echo "💡 Tip: If you need to restore your original .zshrc, check the backup files."



