package com.mrbyte66.content;

import jakarta.validation.constraints.Size;
import java.util.List;

public record ProjectUpdateRequest(
    @Size(max = 200) String slug,
    @Size(max = 300) String title,
    @Size(max = 500) String summary,
    String content,
    List<String> technologies,
    @Size(max = 500) String demoUrl,
    @Size(max = 500) String sourceUrl,
    ContentStatus status) {
}
