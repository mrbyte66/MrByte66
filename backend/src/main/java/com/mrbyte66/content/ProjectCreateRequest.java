package com.mrbyte66.content;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public record ProjectCreateRequest(
    @NotBlank @Size(max = 200) String slug,
    @NotBlank @Size(max = 300) String title,
    @Size(max = 500) String summary,
    @NotBlank String content,
    List<String> technologies,
    @Size(max = 500) String demoUrl,
    @Size(max = 500) String sourceUrl,
    @NotNull ContentStatus status) {
}
