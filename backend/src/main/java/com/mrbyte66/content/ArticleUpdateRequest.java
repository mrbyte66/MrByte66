package com.mrbyte66.content;

import jakarta.validation.constraints.Size;

public record ArticleUpdateRequest(
    @Size(max = 200) String slug,
    @Size(max = 300) String title,
    String content,
    ArticleStatus status) {
}
