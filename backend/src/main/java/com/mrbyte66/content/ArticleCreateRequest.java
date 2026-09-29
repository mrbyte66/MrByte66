package com.mrbyte66.content;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ArticleCreateRequest(
    @NotBlank @Size(max = 200) String slug,
    @NotBlank @Size(max = 300) String title,
    @NotBlank String content,
    @NotNull ArticleStatus status) {
}
