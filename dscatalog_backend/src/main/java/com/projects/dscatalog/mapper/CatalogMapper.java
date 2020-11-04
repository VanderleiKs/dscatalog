package com.projects.dscatalog.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CatalogMapper {

    CatalogMapper INSTANCE = Mappers.getMapper(CatalogMapper.class);

//    Category toCategory(CategoryDTO categoryDTO);
//    CategoryDTO toCategoryDTO(Category category);

}
