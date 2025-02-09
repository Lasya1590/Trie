class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    autoSuggest(prefix, limit = 10) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) return [];
            node = node.children[char];
        }
        return this.getWordsFromNode(node, prefix, limit);
    }

    getWordsFromNode(node, prefix, limit, results = []) {
        if (results.length >= limit) return results;
        if (node.isEndOfWord) results.push(prefix);
        for (let char in node.children) {
            if (results.length >= limit) break;
            this.getWordsFromNode(node.children[char], prefix + char, limit, results);
        }
        return results;
    }
}

const trie = new Trie();

// Fetch words and insert in batches
fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt')
    .then(response => response.text())
    .then(text => {
        let words = text.split('\n').map(word => word.trim());
        let batchSize = 5000;
        let index = 0;

        function insertBatch() {
            let end = Math.min(index + batchSize, words.length);
            for (; index < end; index++) {
                trie.insert(words[index]);
            }
            if (index < words.length) {
                setTimeout(insertBatch, 0); // Allow UI thread to breathe
            }
        }

        insertBatch();
    });

function fetchSuggestions() {
    let query = document.getElementById("search").value;
    let suggestions = trie.autoSuggest(query, 10);
    let suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = "";

    if (suggestions.length > 0) {
        suggestionsBox.style.display = "block";
        let fragment = document.createDocumentFragment();
        suggestions.forEach(word => {
            let div = document.createElement("div");
            div.innerText = word;
            div.onclick = function() {
                document.getElementById("search").value = word;
                suggestionsBox.style.display = "none";
            };
            fragment.appendChild(div);
        });
        suggestionsBox.appendChild(fragment);
    } else {
        suggestionsBox.style.display = "none";
    }
}

function refreshPage() {
    document.getElementById("search").value = "";
    document.getElementById("suggestions").innerHTML = "";
    document.getElementById("suggestions").style.display = "none";
}
