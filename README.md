# Trie
# Introduction to TRIE Advanced Data Structure

A TRIE (pronounced as "try" or "tree") is an advanced tree-based data structure primarily used for storing and searching strings efficiently. Unlike binary search trees, TRIE stores characters at each node, forming paths that represent words. It is widely used for prefix-based searching and dictionary implementations. TRIE is also known as a prefix tree or digital tree due to its structure and functionality.

# Important Operations on TRIE

Insertion: Each character of a word is inserted sequentially into the TRIE. If a character node does not exist, it is created.

Search: The word is searched character by character. If all characters exist in sequence, the word is found.


Prefix Search: This operation returns all words that start with a given prefix by traversing the corresponding path in the TRIE.

Autocomplete: By utilizing prefix search, suggestions for autocomplete can be retrieved efficiently.

# Complexity Analysis for Storing Large Amounts of Words

For n words, where m is the average word length:

Array:

Insertion Complexity: O(n * m), as each word must be stored completely.

Search Complexity: O(n * m), as a full scan may be required.

Space Complexity: O(n * m), since all words are stored explicitly.

Linked List:

Insertion Complexity: O(n * m), as each word needs to be inserted node by node.

Search Complexity: O(n * m), as searching may require traversing the entire list.

Space Complexity: O(n * m), as each character has its own node.

Binary Search Tree (BST):

Insertion Complexity: O(n * log n) in average cases, O(n^2) in worst-case unbalanced trees.

Search Complexity: O(log n) in average cases, O(n) in worst-case scenarios.

Space Complexity: O(n * m), where each word is stored in a separate node.

TRIE:

Insertion Complexity: O(n * m), as each word of length m needs to be inserted character by character.

Search Complexity: O(m), as searching involves traversing at most m levels.

Space Complexity: O(n * m), since each word may introduce new nodes in the TRIE structure.

TRIE offers efficient word storage and searching with O(m) time complexity per query, making it highly useful for applications requiring fast lookups.

# How to Use TRIE as a Map?

A TRIE can function as a map (or dictionary) where each word is a key, and the value is stored in the end node of the word.

Each node contains a hashmap (or array) of child nodes representing characters.

The value associated with a word is stored in a designated field at the end of the word.

This structure enables efficient key-value pair lookups while also supporting prefix-based queries.

Example in Java:
```

import java.util.HashMap;

class TrieNode {
    HashMap<Character, TrieNode> children = new HashMap<>();
    String value = null;
}

class TrieMap {
    private TrieNode root;
    
    public TrieMap() {
        root = new TrieNode();
    }
    
    public void insert(String key, String value) {
        TrieNode node = root;
        for (char ch : key.toCharArray()) {
            node.children.putIfAbsent(ch, new TrieNode());
            node = node.children.get(ch);
        }
        node.value = value;
    }
    
    public String get(String key) {
        TrieNode node = root;
        for (char ch : key.toCharArray()) {
            if (!node.children.containsKey(ch)) {
                return null;
            }
            node = node.children.get(ch);
        }
        return node.value;
    }
}
```

# Real-World Applications of TRIE

Autocomplete Systems: Used in search engines, chat applications, and word processors to suggest words based on prefixes.

Dictionary Implementations: TRIE is extensively used in spell checkers and thesaurus applications.

IP Routing: Longest prefix matching in network routing protocols like CIDR.

Database Indexing: TRIE helps in indexing databases where fast lookups are required.

Compression Algorithms: TRIE-based structures like T9 predictive text input use efficient storage and retrieval techniques.

TRIE is an indispensable data structure for efficient string storage and retrieval, making it a fundamental component in various applications requiring fast prefix searches and dictionary-like mappings.
