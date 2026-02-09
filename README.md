# Creator Cart MVP

A Next.js application for creators, built with modern web technologies.

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Database:** Mongoose (MongoDB)
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts

## Getting Started

### Prerequisites

- Node.js installed

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd creator-cart-mvp
    ```
3.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Git Configuration

To set up your git user email for this specific repository, run the following command in your terminal within the project directory:

```bash
git config user.email "rendezvousthomso@gmail.com"
```

Verify the configuration:

```bash
git config user.email
```

It should output: `rendezvousthomso@gmail.com`

## SSH Agent Setup

To set up the SSH agent for `rendezvousthomso@gmail.com`, follow these steps:

1.  **Generate a new SSH key** (if you haven't already):
    ```bash
    ssh-keygen -t ed25519 -C "rendezvousthomso@gmail.com"
    ```
    *   When prompted to "Enter a file in which to save the key", press Enter to accept the default location.
    *   At the prompt, type a secure passphrase.

2.  **Start the ssh-agent in the background**:
    ```bash
    eval "$(ssh-agent -s)"
    ```
    *   You should see an output like `Agent pid 12345`.

3.  **Add your SSH key to the ssh-agent**:
    If you are on macOS, you may need to modify your `~/.ssh/config` file to automatically load keys into the ssh-agent and store passphrases in your keychain.

    Add the following to your `~/.ssh/config` file (create it if it doesn't exist):
    ```
    Host *
      AddKeysToAgent yes
      UseKeychain yes
      IdentityFile ~/.ssh/id_ed25519
    ```

    Then add the key:
    ```bash
    ssh-add --apple-use-keychain ~/.ssh/id_ed25519
    ```
    *(Note: `--apple-use-keychain` stores the passphrase in your keychain so you don't have to enter it every time. If you didn't set a passphrase or are on Linux, you can omit this flag or use just `ssh-add ~/.ssh/id_ed25519`)*.

4.  **Add the SSH key to your GitHub account**:
    *   Copy the SSH key to your clipboard:
        ```bash
        pbcopy < ~/.ssh/id_ed25519.pub
        ```
    *   Go to GitHub Settings > SSH and GPG keys > New SSH key.
    *   Paste your key into the "Key" field and give it a title related to your machine.
