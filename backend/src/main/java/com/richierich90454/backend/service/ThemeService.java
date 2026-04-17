package com.richierich90454.backend.service;

import com.richierich90454.backend.model.Theme;
import com.richierich90454.backend.repository.ThemeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ThemeService{

    private final ThemeRepository themeRepository;

    public ThemeService(ThemeRepository themeRepository){
        this.themeRepository=themeRepository;
    }

    /**
     * Retrieves all themes.
     * @return list of Theme entities
     */
    public List<Theme> getAllThemes(){
        return themeRepository.findAll();
    }

    /**
     * Retrieves a theme by its ID.
     * @param id theme ID
     * @return Theme entity
     * @throws RuntimeException if not found
     */
    public Theme getThemeById(Long id){
        return themeRepository.findById(id).orElseThrow(() -> new RuntimeException("Theme not found"));
    }

    /**
     * Creates a new theme.
     * @param theme theme entity
     * @return saved Theme entity
     */
    public Theme createTheme(Theme theme){
        return themeRepository.save(theme);
    }

    /**
     * Updates an existing theme.
     * @param id theme ID
     * @param themeDetails updated theme data
     * @return updated Theme entity
     */
    public Theme updateTheme(Long id, Theme themeDetails){
        Theme theme=getThemeById(id);
        theme.setName(themeDetails.getName());
        theme.setDescription(themeDetails.getDescription());
        return themeRepository.save(theme);
    }

    /**
     * Deletes a theme by its ID.
     * @param id theme ID
     */
    public void deleteTheme(Long id){
        themeRepository.deleteById(id);
    }
}