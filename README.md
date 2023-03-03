<p align="center">
  <img width="192" height="192" src="https://github.com/captain-woof/chirag/raw/v1.0.0/src/icons/192.png" alt="Chirag logo">
</p>

# Introduction

Chirag is a Chrome extension to mock API responses, by having your requests intercepted and responded with your chosen response.

# Install

There are two ways to get Chirag running in your browser.

## Building from source

To build from source, clone the repository, and run:

```
npm install && npm run build
```

Then enable "Developer Mode" in Extensions page, and load the `dist` folder as an unpacked extension.

## Using release package

Download the `chirag.zip` from [releases](https://github.com/captain-woof/chirag/releases), extract out the extension package, then drop it in your browser to install it.

# Usage

1. Just add a URL you wanna mock a response for, add the corresponding response body, headers, etc.
2. Turn on the extension, and enable the added intercept.
3. Then have your current webpage make a request to the URL you just added.

# Demo

https://user-images.githubusercontent.com/72122026/222662159-b219c5eb-f0ea-4b2e-8c85-4f9fc7136f8d.mp4


[Try it out here](https://captain-woof.github.io/chirag/demo/)
